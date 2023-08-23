import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from './reducers/dataWritersReducer';
import './styles/BookForm.css';

const BookForm = ({ book, onChange, onRemove, onCancel, onSave, availableGenres }) => {
  const [title, setTitle] = useState(book.title);
  const [year, setYear] = useState(book.year);
  const [pages, setPages] = useState(book.pages);
  const dispatch = useDispatch();

  const [titleError, setTitleError] = useState('');
  const [yearError, setYearError] = useState('');
  const [pagesError, setPagesError] = useState('');

  const [selectedGenre, setSelectedGenre] = useState(
    book.genres && book.genres.length > 0 ? book.genres[0] : ''
  );

  const handleCancelClick = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!title) {
      setTitleError('Пожалуйста, заполните это поле.');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!/^\d+$/.test(year)) {
      setYearError('Введите корректный год.');
      hasError = true;
    } else {
      const currentYear = new Date().getFullYear();
      if (parseInt(year, 10) > currentYear) {
        setYearError('Год издания не может быть больше текущего года.');
        hasError = true;
      } else {
        setYearError('');
      }
    }

    if (!/^\d+$/.test(pages)) {
      setPagesError('Введите корректное количество страниц.');
      hasError = true;
    } else {
      setPagesError('');
    }

    if (hasError) {
      return;
    }

    const updatedBook = {
      ...book,
      title,
      year,
      pages,
      genres: [selectedGenre],
    };

    dispatch(updateBook(book.authorId, book.id, updatedBook));

    onSave(updatedBook);
    onCancel();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onChange({ ...book, title: e.target.value });
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    onChange({ ...book, year: e.target.value });
  };

  const handleRemoveClick = () => {
    onCancel();
    onRemove(book.id);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    onChange({ ...book, genres: [e.target.value] });
  };

  const handlePagesChange = (e) => {
    setPages(e.target.value);
    onChange({ ...book, pages: e.target.value });
  };

  return (
    <div className="book-form">
      <label>
        Заголовок:
        <input type="text" value={title} onChange={handleTitleChange} />
        {titleError && <span style={{ color: 'red' }}>{titleError}</span>}
      </label>

      <label>
        Год издания:
        <input type="text" value={year} onChange={handleYearChange} />
        {yearError && <span style={{ color: 'red' }}>{yearError}</span>}
      </label>

      <label>
        Количество страниц:
        <input type="number" value={pages} onChange={handlePagesChange} />
        {pagesError && <span style={{ color: 'red' }}>{pagesError}</span>}
      </label>

      <label>
        Жанр:
        {availableGenres.length > 0 ? (
          <select value={selectedGenre} onChange={handleGenreChange} readOnly={availableGenres.length === 1}>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        ) : (
          <span> Нет жанра</span>
        )}
      </label>

      <div className="book-buttons">
        <button type="button" className="btn" onClick={handleCancelClick}>
          Отмена
        </button>
        <button type="button" className="btn" onClick={handleSaveClick}>
          Сохранить
        </button>
        <button className="btn" onClick={handleRemoveClick}>
          Удалить книгу
        </button>
      </div>
    </div>
  );
};

export default BookForm;
