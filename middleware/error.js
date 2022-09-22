

const winston = require('winston')


module.exports =  function(err,req,res,next){
  winston.loerrorg(err.message,err)
  //error
  //warning
  //info  like connected to db
  //verbose
  //debug
  //silly
    res.status(500).send('Somthing went wrong.')
}