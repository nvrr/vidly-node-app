 const jwt = require('jsonwebtoken')
 const config = require('config')

 module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(402).send('Access denied. No token provided.')

   try {
    //* verify and decoded token
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
   req.user = decoded;
   next();
} 
   catch(e){
    res.status(400).send('Invalid token.',e)
   }
 }

//  module.exports = auth;