const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);