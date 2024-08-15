const express = require('express');
const router = express.Router();
const {Users, validate} = require('../models/register')
const mongoose = require('mongoose');

router.post('api/register', async (req, res)=>{
    const { error } = validate(req, res);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const users = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    await users.save();
    res.send(users);
})