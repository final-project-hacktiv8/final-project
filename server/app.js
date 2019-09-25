require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const userRoutes = require('./routes/rUser');
const tokenRoutes = require('./routes/rToken');
const machineRoutes = require('./routes/rMachine');
const errorHandler = require('./helpers/errorHandler');
// Using Middleware 
app.use(cors())
app.use(express.urlencoded({extended: false, limit:"100mb"}))
app.use(express.json())

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false} ,function(err){  
  console.log('Connected TO DB')
})
//Routing
app.use('/user', userRoutes)
app.use('/machine', machineRoutes)
app.use('/token',tokenRoutes)
app.use(errorHandler)
app.listen(PORT, function(){
    console.log('CONNECTED TO PORT '+PORT)
})

module.exports = app