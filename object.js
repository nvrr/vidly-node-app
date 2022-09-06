const mongoose = require('mongoose')

//TimeStamp
const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());

//validate objectId
const isValid = mongoose.Types.ObjectId.isValid('1234') 
console.log(isValid); //false 
