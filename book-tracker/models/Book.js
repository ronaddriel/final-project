const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, required: true },
    dateFinished: { type: Date, default: null },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;