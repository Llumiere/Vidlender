const Joi = require('joi');
const { required } = require('joi');
const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 50,

    },
    password:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,

    }
})

const User = mongoose.model('User',regSchema);

function validateRegistration(reg){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255),
        email: Joi.string().required().min(5).max(255),
        password: Joi.string().required().min(5).max(255),
    })
};

exports.validate = validateRegistration;
exports.User = User;