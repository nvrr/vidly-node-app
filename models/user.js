const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose = require("mongoose");

//** Schemaa */
const userSchema =  mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:4,
        maxlength:255,
        trim:true
    },
    email: {
        type:String,
        require:true,
        unique: true, 
        minlength:5,
        maxlength:255,
    },
    password: {
        type: String,
        require:true,
        minlength:5,
        maxlength:1024,
    },
  
})

//*
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

//**Model */
const User =  mongoose.model('User', userSchema);

//validation
function validateUser(user){
    const schema = Joi.object({ 
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user)
}

exports.User = User;
exports.validate = validateUser;