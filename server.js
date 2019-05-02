//Dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session');
const db = mongoose.connection
const methodOverride = require('method-override');

//PORT
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dreams'


// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Open connection to Mongo
db.on('open', () => {

})
//Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

//Middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: "feedmeseymour",
    resave: false,
    saveUninitialized: false
}));




//Routes
//Landing Page



app.get('/', (req, res) => {
    res.render('landingpage.ejs')
})

//Home
app.get('/home/:choice', (req, res) => {
    let sleepStatus = req.params.choice
    res.render('home.ejs', {
        sleepStatus: sleepStatus,
        currentUser: req.session.currentUser

    })
})

app.get('/more/:choice', (req, res) => {
    let sleepStatus = req.params.choice
    res.render('more.ejs', {
        sleepStatus: sleepStatus,
        currentUser: req.session.currentUser
    })
})

app.get('/sleeptracker/:choice', (req, res) => {
    let sleepStatus = req.params.choice
    res.render('sleeptracker.ejs', {
        sleepStatus: sleepStatus
    })
})


//Dream Routes
const dreamController = require('./controllers/dreams_controller.js')
app.use('/dreamjournal', dreamController)

//User routes
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

//Session Routes
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})

