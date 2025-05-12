const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const app = express();

// Middleware:
app.use(express.json()); // Parses JSON request bodies
app.use(cors()); // Enables CORS

// MongoDB connection:
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Start the server:
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Get all books:
app.get('/books/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get all books by id:
app.get('/books/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        console.error('Error fetching book:', err);
        res.status(500).json({ message: err.message });

    }
});

// Create a new book:
app.post('/books', async (req, res) => {
    console.log('Incoming request body:', req.body);  // Log the request body to confirm it's being parsed

    try {
        // Destructure values from the request body
        const { title, author, status, notes } = req.body;

        // Ensure all fields are provided
        if (!title || !author || !status || !notes) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new book
        const newBook = new Book({
            title,
            author,
            status,
            notes,
        });

        // Save the new book to the database
        await newBook.save();
        res.status(201).json(newBook);  // Send back the newly created book
    } catch (error) {
        console.error('Error in POST /books:', error);  // Log any errors
        res.status(500).json({ message: 'Error adding book' });  // Respond with a 500 if there's an error
    }
});

// Update a book:
app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, status, notes } = req.body;

        // Ensure all fields are provided
        if (!title || !author || !status || !notes) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a book:
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ message: err.message });
    }
});