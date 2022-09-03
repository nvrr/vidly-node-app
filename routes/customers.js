
const mongoose = require("mongoose");
const Joi = require('joi')
const express = require('express')
const router = express.Router();


//** Schemaa */
const customerSchema =  mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:5,
        maxlength:50
    },
    phone: {
        type:Number,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold: {
        type: Boolean,
        default:false
    }
})

//**Model */
const Customer =  mongoose.model('Customer', customerSchema);



//Routes

router.get('/', async (req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers)
})

router.post('/', async (req, res) => {

    const {error} = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)
 
    let customer = new Customer({
        name: req.body.name
    });
   customer = await customer.save()
    res.send(customer);
});


function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.number().min(5).max(50).required(),
        isGold:Joi.boolean()
    });

    return schema.validate(customer)
}


module.exports = router;

