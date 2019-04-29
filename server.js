//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const methodOverride = require('method-override');

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
app.use(methodOverride('_method')) //Allows delete and put method
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))



//Routes
//Landing Page
app.get('/', (req, res) => {
    // console.log(req.params.choice)
    res.render('landingpage.ejs')
})

//Home
app.get('/home/:choice', (req, res) => {
    let sleepStatus = req.params.choice
    console.log(sleepStatus)
    res.render('home.ejs', {
        sleepStatus: sleepStatus
    })
})

app.get('/more/:choice', (req, res) => {    
    let sleepStatus = req.params.choice
    console.log(sleepStatus)
    res.render('more.ejs', {
        sleepStatus: sleepStatus
    })
})

app.get('/sleeptracker/:choice', (req, res) => {
    let sleepStatus = req.params.choice
    console.log(sleepStatus)
    res.render('sleeptracker.ejs', {
        sleepStatus: sleepStatus
    })
})


//Dream Routes
const dreamController = require('./controllers/dreams_controller.js')
app.use('/dreamjournal', dreamController)

app.listen(PORT, ()=> {
    console.log('listening on port', PORT)
})

