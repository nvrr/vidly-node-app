const Joi = require('joi')
const mongoose = require("mongoose");
const {genereSchema} = require('./genre')


//** Schemaa */
const moviesSchema =  mongoose.Schema({
    title: {
        type:String,
        required: true,
        minlength:5,
        maxlength:255,
        trim:true
    },
    genre: {
        type:genereSchema,
        require:true
    },
    numberInStock: {
        type: Number,
        require:true,
        min:0,
        max:255
    },
    numberdailyTentalRatedaInStock: {
        type: Number,
        require:true,
        min:0,
        max:255
    }
})

//**Model */
const Movie =  mongoose.model('Movie', moviesSchema);


//validation
function validateMovies(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required,
        numberInStock: Joi.number().mim(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(genre)
}


exports.Movie = Movie;
exportd.validate = validateMovies;