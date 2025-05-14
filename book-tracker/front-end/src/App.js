import React, { useState, useEffect } from 'react';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get('http://localhost:5000/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddBook = (newBook) => {
    // Add the new book to the list
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Books:</h1>
      <AddBookForm onAddBook={handleAddBook} />
      <hr />
      <BookList books={books} />
    </div>
  );
};

export default App;