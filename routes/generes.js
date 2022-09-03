
const Joi = require('joi')
const express = require('express')
const router = express.Router();


const generes = [{ id: 1, name: 'Romance' }, { id: 2, name: 'Thriller' }, 
{ id: 3, name: 'Drama' }];

//Routes
router.get('/:id', (req,res)=>{
    var gener = generes.find(c => {
        return c.id === parseInt(req.params.id)
    });

    if(!gener) res.status(404).send('gener doent exist..')

    res.send(gener)
})

router.get('/', (req,res)=>{
    res.send(generes)
})

router.post('/', (req, res) => {
   

    const {error} = validateGeneres(req.body)
    if(error) return res.status(400).send(error.details[0].message)
 
    const gener = {
        id: generes.length + 1,
        name: req.body.name
    };
    generes.push(gener);
    res.send(gener);
});

router.put('/:id', (req, res) => {    
    var gener = generes.find(c => {return c.id === parseInt(req.params.id)});
    if (!gener)  {
        res.status(404).send('The gener with the given ID was not found')
        return;
    };

    const {error} = validateGeneres(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    gener.name = req.body.name;
    res.send(gener);
});


router.delete('/:id', (req, res) => {
    var gener = generes.find(c => {return c.id === parseInt(req.params.id)});

    if (!gener) return res.status(404).send('The gener with the given ID was not found');
const index = generes.indexOf(gener)
generes.splice(index,1)
res.send(gener)
});


function validateGeneres(gener){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(gener)
}


module.exports = router;

