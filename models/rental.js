
const Joi = require('joi')
const mongoose = require("mongoose");

//** Schemaa */
const rentalSchema =  mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength:5,
        maxlength:50,
        trim:true
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
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type:String,
                required: true,
                minlength:5,
                maxlength:50,
                trim:true
            },
            dailyRentalRate: {
                type:Number,
                required:true,
                min:0,max:255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required:true,
        default:Date.now
    },
    dateReturned: {
        type:Date
    },
    rentalFee:{
        type: Number,
        min:0
    }

})

//**Model */
const Rental =  mongoose.model('Rental', rentalSchema);

//validation
function validateRentals(rental){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });

    return schema.validate(rental)
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validate = validateRentals;