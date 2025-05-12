const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(cors()); // Enables CORS




// MongoDB connection
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

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add a route to add a new book
app.post('/books', async (req, res) => {
    console.log('Incoming request body:', req.body);  // Log the request body to confirm it's being parsed

    try {
        // Destructure values from the request body
        const { title, author, status, notes } = req.body;


        // Create a new book
        const newBook = new Book({
            title,
            author,
            status,
            notes
        });

        // Save the new book to the database
        await newBook.save();
        res.status(201).json(newBook);  // Send back the newly created book
    } catch (error) {
        console.error('Error in POST /books:', error);  // Log any errors
        res.status(500).json({ message: 'Error adding book' });  // Respond with a 500 if there's an error
    }
});

app.post('/test', (req, res) => {
    console.log('Body received:', req.body);
    res.json({ received: req.body });
});