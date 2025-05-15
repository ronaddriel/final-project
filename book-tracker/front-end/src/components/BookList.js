import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookList = ({ books, fetchBooks }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to the edit page with the book ID
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios
        .delete(`http://localhost:3000/books/${id}`) // Send DELETE request to backend
        .then(() => {
          fetchBooks(); // Refresh the book list after deletion
        })
        .catch((err) => console.error('Error deleting book:', err));
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="border p-4 mb-4 rounded">
            <h3 className="font-bold text-lg">{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Status:</strong> {book.status}</p>
            <p><strong>Notes:</strong> {book.notes}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(book._id)} // Call handleEdit with the book ID
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)} // Call handleDelete with the book ID
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;