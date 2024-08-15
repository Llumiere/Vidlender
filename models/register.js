const Joi = require('joi');
const { required } = require('joi');
const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
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
        match: /[A-Za-z]*/,
        minlength: 3,
        maxlength: 50,

    }
})

const Users = mongoose.model('users',regSchema);

function validateRegistration(reg){
    const schema = Joi.object({
        name: Joi.string().required().min().max(),
        email: Joi.string().required().min().max(),
        password: Joi.string().required().min().max(),
    })
};

exports.validate = validateRegistration;
exports.Users = Users;