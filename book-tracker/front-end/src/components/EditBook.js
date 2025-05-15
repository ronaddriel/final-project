import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: '',
    notes: ''
  });

  const [error, setError] = useState('');

  // Fetch the book data to edit
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/books/${id}`) // Use environment variable
      .then((res) => {
        setFormData(res.data); // Populate the form with the book data
      })
      .catch((err) => {
        console.error('Error fetching book:', err);
        setError('Book not found');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/books/${id}`, formData) // Use environment variable
      .then(() => navigate('/')) // Redirect after successful update
      .catch((err) => {
        console.error('Update error:', err);
        setError('Error updating book');
      });
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Title"
          required
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Author"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Notes"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default BookEdit;