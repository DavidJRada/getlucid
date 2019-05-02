const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')


sessions.get('/new/:choice', (req, res) => {
    res.render('sessions/new.ejs', {
        sleepStatus: req.params.choice,
        currentUser: req.params.currentUser
    })
})

sessions.post('/:choice', (req, res) => {
    let sleepStatus = req.params.choice
    // console.log(req.session.currentUser)
    console.log(req.body.username, 'req.body')
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        console.log(foundUser + 'foundUser')
        if (err) {
            res.redirect(`/sessions/invalid/${sleepStatus}`)
        }
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.redirect(`/home/${sleepStatus}`);
        } else {
            res.redirect(`/sessions/invalid/${sleepStatus}`)

        }

    })
})

sessions.get('/invalid/:choice', (req, res) => {
    res.render('sessions/invalid.ejs', {
        sleepStatus: req.params.choice,
        currentUser: req.params.currentUser
    })
})



sessions.delete('/:choice', (req, res) => {
    let sleepStatus = req.params.choice
    req.session.destroy(() => {
        res.redirect(`/home/${sleepStatus}`)
    })
})

module.exports = sessions