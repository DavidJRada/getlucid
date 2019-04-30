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
            console.log(err)
        } else {
        res.redirect(`/sessions/${sleepStatus}`)
        }
    });
})


module.exports = user