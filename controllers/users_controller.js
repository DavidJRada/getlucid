const bcrypt = require('bcrypt')
const express = require('express')
const user = express.Router()
const User = require('../models/users.js')

user.get('/new/:choice', (req, res) => {
  res.render('users/new.ejs', {
      sleepStatus: req.params.choice,
      currentUser: req.session.currentUser
  })
})

user.post('/:choice', (req, res) => {
    let sleepStatus = req.params.choice
    console.log(sleepStatus)
    
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.redirect(`/users/invalid/${sleepStatus}`)
        } else {
            req.session.currentUser = createdUser.username
        res.redirect(`/home/${sleepStatus}`)
        }
    });
})

user.get('/invalid/:choice', (req, res) => {
    res.render('users/invalid.ejs', {
        sleepStatus: req.params.choice,
        currentUser: req.session.currentUser
    })
  })



module.exports = user