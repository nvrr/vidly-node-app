

const express = require('express')
const users = require('../routes/users')
const auth = require('../routes/auth')
const rentals = require('../routes/rentals')
const movies = require('../routes/movies')
const customers = require('../routes/customers')
const genres = require('../routes/genres')


module.exports = function(app){
    //*middleware
app.use(express.json());
// Built-in Middleware wit tis we can pass arrays ,comples objects
// app.use(express.urlencoded({extended: true}))

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error)
}