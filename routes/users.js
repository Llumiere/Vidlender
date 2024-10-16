const _ = require("lodash")
const bcrypt = require("bcryptjs");
const config = require('config');
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user')
const mongoose = require('mongoose');


router.post('/', async (req, res)=>{
    const { error } = validate(req.body);

    if(error){return res.status(400).send(error.details[0].message);}

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already Exist...')

    user = new User(_.pick(req.body,["name","email","password"]));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();



    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user,["_id","name","email"]));
})

router.get('/', async (req, res)=>{ 
    const user = await User.find();
    res.send(_.pick(user,["name","email"]));
   
    // res.send(user);
})

router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id);
    
    if(!user) return res.status(404).send("Given ID Not Found")
   
    res.send(user);
})

router.delete('/:id', async (req, res)=>{
    const user = await User.findOneAndDelete(req.params.id);

    if(!user)
        return res.status(400).send("Given ID not found");

    res.send(user);
})

module.exports = router;