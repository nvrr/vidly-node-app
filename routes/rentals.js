
const {Rental, validate} = require('../models/rental')
const {Movie} = require('../models/movie')
const express = require('express')
const router = express.Router();

//Routes
router.get('/', async (req,res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals)
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
 
    let rental = new Rental({
        name: req.body.name
    });
    rental = await rental.save()
    res.send(rental);
});

module.exports = router;

