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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Book</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddBookForm;