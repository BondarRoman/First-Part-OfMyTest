import React from 'react';
import './styles/AuthorDetails.css';

const AuthorDetails = ({ author }) => {
  return (
    <div className="author-details">
      <div className="author-name">
        <h2>{author.name}</h2>
        <h2>{author.fathersname}</h2>
        <h2>{author.surname}</h2>
      </div>
      <div className="author-info">
        <h2>Родился {author.birthdate}</h2>
        <h3>Книги:</h3>
        {author.books.map((book, index) => {
          return (
            <div className="book-details" key={index}>
              <div><strong>Название книги:</strong> {book.title}</div>
              <div><strong>Год выпуска:</strong> {book.year}</div>
              <div><strong>Количество страниц:</strong> {book.pages}</div> {/* Добавлено отображение количества страниц */}
              {/* Проверка на наличие book.genres */}
              {book.genres && book.genres.length > 0 ? (
                <div><strong>Жанр:</strong> {book.genres.join(', ')}</div>
              ) : (
                <div><strong>Жанр:</strong> Нет жанра</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AuthorDetails;
