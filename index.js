const mongoose = require('mongoose')
const express = require('express');
const genres = require('./routes/genres')
const customers = require('./routes/customers');
const movies = require('./routes/movies')
const rental = require('./routes/rentals')
const home = require('./routes/home')
const app = express();
const Joi = require('joi');
Joi.objectId =  require('joi-objectid')(Joi);

const Genre = mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to database...'))
.catch(err => console.log('Connection error...'))

app.use(express.json())
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies)
app.use('/api/rentals', rental)
app.use('/', home);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{console.log(`Listening to port ${PORT}...`)});