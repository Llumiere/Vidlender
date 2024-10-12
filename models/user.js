const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 255,

    },
    password:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,

    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, email: this.email}, config.get('jwtPrivateKey'), {expiresIn:'1h'})
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(5).max(255),
        password: Joi.string().required().min(5).max(1024),
    })
    return schema.validate(user);
};

exports.validate = validateUser;
exports.User = User;