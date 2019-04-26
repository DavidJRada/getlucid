const express = require('express');
const router = express.Router();
const Dream = require('../models/dreams.js')

//New
router.get(`/new/:choice`, (req, res) => {
    let sleepStatus = req.params.choice
    console.log(sleepStatus)
    res.render('new.ejs', {
        sleepStatus: sleepStatus
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
            dream: foundDream
        })
    })
})

//Index
router.get('/:choice', (req, res) => {
    sleepStatus = req.params.choice
    Dream.find({}, (err, allDreams) => {
        if (err) console.log(err);
        res.render('index.ejs', {
            sleepStatus: req.params.choice,
            dreams: allDreams
        })
    })
})







//Delete

router.delete('/:id', (req, res) => {
    Dream.findByIdAndRemove(req.params.id, (err, removedItem) => {
        if (err) console.log(err);
        console.log(removedItem)
        res.redirect('/dreamjournal');  //redirect back to index route
    })
});

//Edit (client)

router.get('/:id/edit', (req, res) => {
    Dream.findById(req.params.id, (err, foundDream) => { //find the fruit
        if (err) console.log(err);
        res.render(
            'edit.ejs',
            {
                dream: foundDream //pass in found fruit
            }
        );
    });
});

//Edit (server)

router.put('/:id', (req, res) => {
    console.log(req.body)
    Dream.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
        if (err) console.log(err);
        res.redirect('/dreamjournal');
    });
});


module.exports = router