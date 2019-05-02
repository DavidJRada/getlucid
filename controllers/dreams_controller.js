const express = require('express');
const router = express.Router();
const Dream = require('../models/dreams.js')
const moment = require('moment')


//New
router.get(`/new/:choice`, (req, res) => {
    let sleepStatus = req.params.choice
    console.log(sleepStatus)
    res.render('new.ejs', {
        sleepStatus: sleepStatus,
        currentUser: req.session.currentUser
    })
})
//Create(Server)
router.post('/:choice', (req, res) => {
    let dream = req.body
    console.log(dream)
    dream.user = req.session.currentUser.username
    Dream.create(req.body, (err, createdDream) => {
        console.log(createdDream)
        if (err) console.log(err);
        res.redirect(`/dreamjournal/${req.params.choice}`)
    })
})

//Show
router.get('/show/:id/:choice', (req, res) => {
    Dream.findById(req.params.id, (err, foundDream) => {
        if (err) console.log(err);
        foundDream.date = moment(foundDream.date).format('LLLL')
        res.render('show.ejs', {
            sleepStatus: req.params.choice,
            dream: foundDream,
            currentUser: req.session.currentUser
        })
    })
})

//Index
router.get('/:choice', (req, res) => {
    sleepStatus = req.params.choice
    if (!req.session.currentUser) {
        res.redirect(`/sessions/invalid/${sleepStatus}`)
    } else {
        let currentUser = req.session.currentUser
        console.log(currentUser)
        Dream.find({ user: currentUser.username }, (err, allDreams) => {
            if (err) console.log(err);
            res.render('index.ejs', {
                sleepStatus: req.params.choice,
                dreams: allDreams,
                currentUser: req.session.currentUser
            })
        })
    }
})


router.get('/search/:choice', (req, res) => {
    sleepStatus = req.params.choice
    let currentUser = req.session.currentUser;
    let tagSearch = req.query.search
    console.log(tagSearch)
    tagSearch.split(',')
    console.log(tagSearch)

    Dream.find({ tags: req.query.search }, (err, allTags) => {
        console.log(allTags)
        if (err) console.log(err);
        res.render('search.ejs', {
            sleepStatus: req.params.choice,
            tags: allTags,
            currentUser: req.session.currentUser,
        })
    })
})





//Delete

router.delete('/delete/:choice/:id', (req, res) => {
    Dream.findByIdAndRemove(req.params.id, (err, removedItem) => {
        if (err) console.log(err);
        console.log(removedItem)
        res.redirect(`/dreamjournal/${req.params.choice}`);  //redirect back to index route
    })
});

//Edit (client)

router.get('/:id/:choice/edit', (req, res) => {
    Dream.findById(req.params.id, (err, foundDream) => {
        if (err) console.log(err);
        res.render(
            'edit.ejs',
            {
                sleepStatus: req.params.choice,
                dream: foundDream,
                currentUser: req.session.currentUser
            }
        );
    });
});

//Edit (server)

router.put('/:id/:choice', (req, res) => {
    console.log(req.body)
    Dream.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
        if (err) console.log(err);
        res.redirect(`/dreamjournal/${req.params.choice}`);
    });
});


module.exports = router