



const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const express = require('express')
const { MongoDB } = require('winston/lib/winston/transports')
const app = express();

require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()

if(!config.has('jwtPrivateKey')){
    console.log("jjjj:",config.has('jwtPrivateKey'));
    console.error('FAAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}



const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))


