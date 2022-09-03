

const generes = require('./routes/generes')
const express = require('express')
const app = express()

//*middleware
app.use(express.json());
// Built-in Middleware wit tis we can pass arrays ,comples objects
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res)=>{
    res.send('Hello expressjs')
})

app.use('api/generes', generes);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))