

const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const _ = require('lodash')
const Joi = require('joi')
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
 
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Invalid email or password.")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    
    if(!validPassword) return res.status(400).send("Invalid email or password.")


   try {
    const token = jwt.sign({_id:user.id}, config.has("jwtPrivateKey"))
    console.log("tokken:",token);
    res.send(token)
  
   } catch(e){
    console.log("zerr:",e);
   }

});


//validation
function validate(req){
    const schema = Joi.object({ 
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req)
}

module.exports = router;
