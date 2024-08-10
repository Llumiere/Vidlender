const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie')

router.get('/', async (req, res) => {
    const movie = await Movie.find().sort();
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send("Given ID Not Found")

    res.send(movie);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Genre.')

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name,
        },
        numberInstock: req.body.numberInstock,
        dailyRentalRate: req.body.dailyRentalRate
    })
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name },
        { new: true }
    );

    if (!movie) return res.status(404).send("Given ID Not Found")

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIAndRemove(req.params.id)
    if (!movie) return res.status(404).send("Given ID Not Found")

    res.send(movie)
});

module.exports = router;