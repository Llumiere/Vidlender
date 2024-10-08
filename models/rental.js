const mongoose = require('mongoose');
const {genreShema} =require('./genre');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    isGold:{
        type: Boolean,
        default: false,
    }, 
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    }
})

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: customerSchema,
    movie: new mongoose.Schema({
        title: {
            type:String,
            required: true,
            trim:true,
            minlength: 3,
            maxlength: 255,
        },
        dailyRentalRate: {
            type: Number,
            required:true,
            min: 0,
            max: 255
        }
    }),

    // required:true,
    dateOut: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min:0
    },
    
}));

function validateRental(rental){
    // npm i joi-objectId
    const schema = Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required(),
    });

    return schema.validate(rental);
}

exports.validate = validateRental;
exports.Rental = Rental;