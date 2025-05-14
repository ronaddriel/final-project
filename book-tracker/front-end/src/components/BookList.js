import React from 'react';

const BookList = ({ books }) => {
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author} - {book.status}
            <p>{book.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;