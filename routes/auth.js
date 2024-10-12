const _ = require("lodash")
const bcrypt = require("bcryptjs");

const express = require('express');
const router = express.Router();
const {User} = require('../models/user')
const mongoose = require('mongoose');


router.post('/', async (req, res)=>{
    const { error } = validate(req.body);

    if(error){return res.status(400).send(error.details[0].message);}

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(re.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password')

    res.send(true);
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

function validate(req){
    const schema = Joi.object({
        email: Joi.string().required().min(5).max(255),
        password: Joi.string().required().min(5).max(1024),
    })
    return schema.validate(req);
};

module.exports = router;