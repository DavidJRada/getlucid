//Dependencies
const express = require('express')
const methodOverride = require('method-override');
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection

//PORT
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dreams'

//Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Open connection to Mongo
db.on('open', ()=> {

})


//Middleware
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method')) //Allows delete and put method


//Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, ()=> {
    console.log('listening on port', PORT)
})

