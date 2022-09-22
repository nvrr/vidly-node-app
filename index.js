
require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')


const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const express = require('express')
const { MongoDB } = require('winston/lib/winston/transports')
const app = express();

require('./startup/routes')(app)
require('./startup/db')()

//* best practice is using winston for uncaughtExceptions
winston.handleExceptions(
    new winston.transports.File({filename:'uncaughtExceptions.log'})
)

//* uncaught exceptions errors out of express // only for synchronous errors
// process.on('uncaughtException', (ex) => {
//     // console.log('WE GOT AN UNCAUGHT EXCEPTION');
//     winston.error(ex.message, ex)
//     //** its best to terminate process if we haVE EXCEPTIONS and restart server */
//     process.exit(1);
// } )

//* unHandles rejections for promises
process.on('unhandledRejection', (ex) => {
    // console.log('WE GOT AN UNHABDLED REJECTION');
    // winston.error(ex.message, ex)
    // process.exit(1);
    throw ex; // with this winstone catch exception using exception handler above and loggs it
} )




//*** only particular to express ,outside of express not useful */
winston.add(winston.transports.File, { filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db:'mongodb://localhost/vidly', level:'error'})

if(!config.has('jwtPrivateKey')){
    console.log("jjjj:",config.has('jwtPrivateKey'));
    console.error('FAAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}



const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))


