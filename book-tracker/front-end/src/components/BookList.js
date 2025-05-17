import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookList = ({ books, fetchBooks }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); 
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/books/${id}`, { withCredentials: true })
        .then(() => {
          fetchBooks(); // Refresh the book list after deletion
        })
        .catch((err) => {
          console.error('Error deleting book:', err.response?.data || err.message);
          alert(err.response?.data?.message || 'Failed to delete the book. Please try again.');
        });
    }
  };

  return (
       <div className="mt-10">
        
      <h2 className="text-2xl font-semibold text-[#5b3e3e] mb-6 text-center">📖 Your Books</h2>
      <div className="space-y-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-[#e2f0d8] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Book details */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#806859]">{book.title}</h3>
              <p className="text-[#5b3e3e]"><strong>Author:</strong> {book.author}</p>
              <p className="text-[#5b3e3e]"><strong>Status:</strong> {book.status}</p>
              <p className="text-[#5b3e3e]"><strong>Notes:</strong> {book.notes}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 md:flex-col md:items-end">
              <button
                onClick={() => handleEdit(book._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;