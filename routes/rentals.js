const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const { Customer } = require('../models/customer')
const { Movie } = require('../models/movie');
const mongoose  = require('mongoose');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await rentals.find().sort('-dateOut');
});

router.get('/:id', async (req, res) => {
    const rentals = await Genre.findById(req.params.id);

    if (!rentals) return res.status(404).send("Given ID Not Found")

    res.send(rentals);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if(!mongoose.Types.ObjectId.isValid(req.body.customerId))
        return res.status(400).send();

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Genre.')

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Genre.');

    if(movie.numberInstock === 0) return res.status(400).send('Movie not in stock .');

    let rental = new Rental({
        customer: {
            _id: customer.id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie.id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
    });
    try{
    new Fawn.Task()
    .save('rentals', rental)
    .update('movies', {_id: movie._id},{
        $inc: {numberInstock: -1}
    })
    .run()
    }
    catch(ex){
        res.status(500).send('Something Failed...')
    }
    
    // rental = await rental.save();

    // movie.numberInstock--;
    // movie.save();

    res.send(rental)
});