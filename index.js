
require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')
const error = require('./middleware/error')

const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require("mongoose");
const users = require('./routes/users')
const auth = require('./routes/auth')
const rentals = require('./routes/rentals')
const movies = require('./routes/movies')
const customers = require('./routes/customers')
const genres = require('./routes/genres')
const express = require('express')
const { MongoDB } = require('winston/lib/winston/transports')
const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db:'mongodb://localhost/vidly', level:'error'})

if(!config.has('jwtPrivateKey')){
    console.log("jjjj:",config.has('jwtPrivateKey'));
    console.error('FAAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}

mongoose.connect("mongodb://localhost/vidly")
 .then(() => console.log("Connected to mongoDB courses ..."))
 .catch((err) => console.error("Couldnt connect to db...",err));

//*middleware
app.use(express.json());
// Built-in Middleware wit tis we can pass arrays ,comples objects
app.use(express.urlencoded({extended: true}))


// app.get('/', (req,res)=>{
//     res.send('Hello expressjs')
// })

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))


