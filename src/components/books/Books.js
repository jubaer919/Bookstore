import { useState, useRef, useEffect } from 'react';
import Book from './Book';
import AddBook from './AddBook';

export default function Books() {
  const [booksInfo, setBooksInfo] = useState([]);
  const newBookHandlerRef = useRef();
  const removeBookHandlerRef = useRef();

  useEffect(() => {
    const existingBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooksInfo(existingBooks);
  }, []);

  removeBookHandlerRef.current = (bookToRemove) => {
    const updatedBookList = booksInfo.filter((book) => book.id !== bookToRemove.id);
    setBooksInfo(updatedBookList);
    localStorage.setItem('books', JSON.stringify(updatedBookList));
  };

  newBookHandlerRef.current = (existingBooks) => {
    setBooksInfo(existingBooks);
  };

  return (
    <>
      <Book booksInfo={booksInfo} onRemove={removeBookHandlerRef.current} />
      <AddBook onNewBook={newBookHandlerRef.current} />
    </>
  );
}
