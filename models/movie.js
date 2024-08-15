const mongoose = require('mongoose');
const {genreSchema} =require('./genre');
const Joi = require('joi');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim:true,
        minlength: 2,
        maxlength: 255,
    },
    genre: {
        type:genreSchema,
        required:true,
    },
    numberInstock: {
        type: Number,
        required:true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required:true,
        min: 0,
        max: 255
    }
    
}))

function validateMovie(movie){
    const schema = Joi.object({
        title:Joi.string().min(3).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInstock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    });

    return schema.validate(movie);
}

exports.validate = validateMovie;
exports.Movie = Movie;