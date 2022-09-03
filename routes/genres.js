
const mongoose = require("mongoose");
const Joi = require('joi')
const express = require('express')
const router = express.Router();


//** Schemaa */
const genereSchema =  mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:5,
        maxlength:50
    }
})

//**Model */
const Genre =  mongoose.model('Genere', genereSchema);



//Routes

router.get('/', async (req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres)
})

router.post('/', async (req, res) => {

    const {error} = validateGeneres(req.body)
    if(error) return res.status(400).send(error.details[0].message)
 
    let genre = new Genre({
        name: req.body.name
    });
   genere = await genre.save()
    res.send(genre);
});

router.put('/:id', async (req, res) => { 
    const {error} = validateGeneres(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name},{new: true} )

    if (!genre) return res.status(404).send('The gener with the given ID was not found')
     

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) return res.status(404).send('The gener with the given ID was not found');

    res.send(genre)
});

router.get('/:id', async (req,res)=>{
    const genre = await Genre.findById(req.params.id)

    if(!genre) res.status(404).send('gener with given id doesnt exist..')

    res.send(genre)
})



function validateGeneres(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre)
}


module.exports = router;

