const express = require('express');
const router = express.Router();
const Dream = require('../models/dreams.js')


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
    Dream.create(req.body, (err, createdDream) => {
        console.log(createdDream)
        if (err) console.log(err);
        res.redirect(`/dreamjournal/${req.params.choice}`)
    })
})

//Show
router.get('/show/:id/:choice', (req, res) => {
    Dream.findById(req.params.id, (err, foundDream) => {
        console.log(req.params.id)
        if (err) console.log(err);
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
    let currentUser = req.session.currentUser
    let search = 
    Dream.find({}, (err, allDreams) => {
        if (err) console.log(err);
        res.render('index.ejs', {
            sleepStatus: req.params.choice,
            dreams: allDreams,
            currentUser: req.session.currentUser
        })
    })
})


//Search

// router.post('/search/:choice', (req, res) => {
//     console.log(req.body.tag)
//     res.send('landingpage.ejs')
// })

router.get('/search/:choice', (req, res) => {
    sleepStatus = req.params.choice
    let currentUser = req.session.currentUser;
    console.log(req.query.search)
    
    Dream.find({ tags: req.query.search}, 'title content tags', (err, allTags) => {
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