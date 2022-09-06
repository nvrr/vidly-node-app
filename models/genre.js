
const Joi = require('joi')
const mongoose = require("mongoose");

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

//validation
function validateGeneres(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre)
}

exportd.genereSchema = genereSchema;
exports.Genre = Genre;
exportd.validate = validateGeneres;