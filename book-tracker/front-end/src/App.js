import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import axios from 'axios';
import EditBook from './components/EditBook';

const App = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get('http://localhost:3000/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddBook = (newBook) => {
    // Add the new book to the list
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const location = useLocation(); // Get the current route

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Book Tracker App:</h1>
      {/* Render AddBookForm only on the main page */}
      {location.pathname === '/' && <AddBookForm onAddBook={handleAddBook} />}
      <hr />
      <Routes>
        {/* Main page with the book list */}
        <Route
          path="/"
          element={<BookList books={books} fetchBooks={fetchBooks} />}
        />
        {/* Route for editing a book */}
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
};

export default App;