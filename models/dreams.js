const mongoose = require('mongoose')
const dreamSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    content: String,
    tags: [String]
})

const Dream = mongoose.model('Dream', dreamSchema);
module.exports = Dream