const config = require('config')
const mongoose = require('mongoose')
const express = require('express');
const genres = require('./routes/genres')
const customers = require('./routes/customers');
const movies = require('./routes/movies')
const rental = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const home = require('./routes/home')
const app = express();
const Joi = require('joi');
require('dotenv').config();
Joi.objectId =  require('joi-objectid')(Joi);

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not found');
    process.exit(1);
}

const Genre = mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to database...'))
.catch(err => console.log('Connection error...'))

app.use(express.json())
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/rentals', rental)
app.use('/', home);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{console.log(`Listening to port ${PORT}...`)});