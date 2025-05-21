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
    .get(`${process.env.REACT_APP_API_URL}/books`,  { withCredentials: true })
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddBook = (newBook) => {
    // Add the new book to the list
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const location = useLocation(); // Get the current route

  return (
    
    <div className="min-h-screen bg-[#fefce8] p-8">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold text-[#5b3e3e] mb-6 text-center">
      📚 Welcome to the Book Tracker App! 
    </h1>
      {/* Render AddBookForm only on the main page */}
      {location.pathname === '/' && (
  <div className="mb-10">
    <AddBookForm onAddBook={handleAddBook} />
  </div>
)}
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
    </div>
    
  );
};

export default App;