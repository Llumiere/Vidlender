const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Customer, validate} = require('../models/customer')


router.get('/api/genre', async (req, res) => {
    const genre = await Customer.find().sort('name');
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Customer.findById(req.params.id);
    
    if(!genre ) return res.status(404).send("Given ID Not Found")
   
    res.send(genre);
    
});

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });

    // customer = await customer.save(); read more on the mongoDB processesor
    await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) =>{
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const customer = await Customer.findByIAndUpdate(req.params.id,{name: req.body.name} );
    
    if(!customer ){
        return res.status(404).send("Given ID Not Found")
    }
    const { error } = validate(req.body);

    res.send(customer);
})

router.delete('/:id', async (req,res) => {
    const customer = await Customer.findByIAndRemove(req.params.id)
    if(!customer ){
        return res.status(404).send("Given ID Not Found")
    }
    
    res.send(customer)
});

module.exports = router;