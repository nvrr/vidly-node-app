const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vidly")
 .then(() => console.log("Connected to mongoDB courses ..."))
 .catch((err) => console.error("Couldnt connect to db...",err));

 const customers = require('./routes/customers')
const genres = require('./routes/genres')
const express = require('express')
const app = express()

//*middleware
app.use(express.json());
// Built-in Middleware wit tis we can pass arrays ,comples objects
app.use(express.urlencoded({extended: true}))


// app.get('/', (req,res)=>{
//     res.send('Hello expressjs')
// })

app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))