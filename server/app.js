if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const userRoutes = require('./routes/rUser')


app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} ,function(err){
    if (err) throw Error(err)
    else {
        console.log('Connected TO DB')
    }
})

app.get('/', (req,res,next) => {
    res.send('Yay connect')
})

app.use('/user', userRoutes)

app.use((err,req,res,next) => {
    let statusCode = err.statusCode || 500
    let message = err.message
    if (err.name === "ValidationError"){
        let key = Object.keys(err.errors)
        statusCode = 400;
        message = err.errors[key[0]].message; 
    }
    if (err.name === "MongoError"){
        if(err.code == 11000){
            statusCode = 409;
            message = 'email already used'
        }
    }
    res.status(statusCode).json({statusCode, message})
})

app.listen(PORT, function(){
    console.log('CONNECTED TO PORT '+PORT)
})

module.exports = app