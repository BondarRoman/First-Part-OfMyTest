import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles/BooksByGenre.css';

const BooksByGenre = () => {
  const selectedGenre = useSelector((state) => state.dataWriters.selectedGenre);
  const selectedGenreBooks = useSelector((state) => state.dataWriters.selectedGenreBooks);
  const authors = useSelector((state) => state.dataWriters.authors);

  const [hideBooks, setHideBooks] = useState(false);

  // Эффект для сброса состояния hideBooks при изменении выбранного жанра
  useEffect(() => {
    setHideBooks(false);
  }, [selectedGenre]);

  const toggleBooksVisibility = () => {
    setHideBooks(!hideBooks);
  };

  if (!selectedGenre || !selectedGenreBooks) {
    return null;
  }

  return (
    <div className="books-by-genre">
      {hideBooks ? (
        <button onClick={toggleBooksVisibility}>Показать книги</button>
      ) : (
        <>
          <button onClick={toggleBooksVisibility}>Скрыть книги</button>
          {selectedGenreBooks.length === 0 ? (
            <p className="no-books">Нет книг с выбранным жанром</p>
          ) : (
            <>
              <h2>Книги с жанром "{selectedGenre}"</h2>
              {selectedGenreBooks.map((book) => {
                // Найдем автора книги по authorId
                const author = authors.find((author) =>
                  author.books.some((b) => b.id === book.id)
                );

                return (
                  <div className="book-details" key={book.id}>
                    <h3>{book.title}</h3>
                    {author && (
                      <p>
                        Автор: {`${author.name} ${author.fathersname} ${author.surname}`}
                      </p>
                    )}
                    <p>Год: {book.year}</p>
                    <p>Количество страниц: {book.pages}</p> {/* Добавлено отображение количества страниц */}
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BooksByGenre;
