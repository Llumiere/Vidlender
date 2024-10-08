const Joi = require('joi');
const mongoose = require('mongoose');

const custSchema =  new mongoose.Schema({
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
    },
});

const Customer = mongoose.model('Customer', custSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
    });

    return schema.validate(customer);
}

exports.custSchema = custSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;