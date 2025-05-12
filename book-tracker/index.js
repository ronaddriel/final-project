const Book = require('./models/Book');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', // Adjust for the actual frontend URL
    methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));


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
const PORT = process.env.PORT || 3000;
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
    console.log(req.body);  // Log the incoming request body
    try {
        const { title, author, status, notes, dateFinished } = req.body;

        // Validate that the fields are being received
        if (!title || !author || !status || !notes) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newBook = new Book({
            title,
            author,
            status,
            notes,
            dateFinished: dateFinished || null,
        });

        // Save the new book
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error in POST /books:', error); // Log the error
        res.status(500).json({ message: 'Error adding book' });
    }
});