import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBookForm = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: '',
    notes: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/books`, formData) // Use environment variable
      .then((res) => {
        setMessage('Book added successfully!');
        onAddBook(res.data); // Notify parent about the new book
        setFormData({ title: '', author: '', status: '', notes: '' }); // Reset form
      })
      .catch((err) => {
        console.error('Error adding book:', err.response || err.message); 
        setMessage('Error adding book');
      });
  };

  return (
    
    <div className="max-w-md mx-auto bg-yellow-100 rounded-2xl shadow-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-[#806859] mb-6">Add a New Book</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#7d7a3b] mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#7d7a3b] mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#7d7a3b] mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
          >
            <option value="" disabled>Select one</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="want to read">Want to Read</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#7d7a3b] mb-1">Notes</label>
          <textarea
            name="notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-[#d5b843] text-[#5b3e3e] font-bold py-2 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform"
          >
            Add Book
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-4 text-sm text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default AddBookForm;