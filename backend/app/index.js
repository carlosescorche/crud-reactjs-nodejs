const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

//configuraciones
require('./config/app')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set header
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URI);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next()
})

//routers
app.use('/users', require('./routes/user'))

//connecting the database
mongoose.connect(process.env.URLDB, { useCreateIndex: true,useNewUrlParser: true },(err, res) => {
    if (err) throw err;
    console.log('database connected');
})

//runnnig server
app.listen(process.env.PORT, () => console.log('starting server in the port ' + process.env.PORT))
