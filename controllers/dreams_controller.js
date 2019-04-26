const express = require('express');
const router = express.Router();
const Dream = require('../models/dreams.js')

//Index
router.get('/', (req, res) => {
    Dream.find({}, (err, allDreams) => {
        if (err) console.log(err);
        res.render('index.ejs', {
            dreams: allDreams
        })
    })
})

//New
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

//Create(Server)
router.post('/', (req, res) => {
    Dream.create(req.body, (err, createdDream) => {
        console.log(createdDream)
        if (err) console.log(err);
        res.redirect('/dreamjournal')
    })
})

//Show
router.get('/:id', (req, res) => {
    Dream.findById(req.params.id, (err, foundDream) => {
        console.log(req.params.id)
        if (err) console.log(err);
        res.render('show.ejs', {
            dream: foundDream
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