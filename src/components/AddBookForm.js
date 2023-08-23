import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from './reducers/dataWritersReducer';
import { v4 as uuidv4 } from 'uuid';
import './styles/AddBookForm.css';

const AddBookForm = ({ onSave, onCancel }) => {
  const dispatch = useDispatch();
  const availableGenres = useSelector((state) => state.dataWriters.genres);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const [titleError, setTitleError] = useState('');
  const [yearError, setYearError] = useState('');
  const [pagesError, setPagesError] = useState('');
  const [genreError, setGenreError] = useState(''); // Добавлена ошибка для жанра

  const handleSaveClick = (e) => {
    e.preventDefault();

    // Валидация данных
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

    if (!selectedGenre) {
      setGenreError('Выберите жанр.'); // Устанавливаем ошибку для жанра
      hasError = true;
    } else {
      setGenreError('');
    }

    if (hasError) {
      return;
    }

    const newBook = {
      id: uuidv4(),
      title,
      year,
      pages,
      genres: [selectedGenre],
    };

    dispatch(updateBook(newBook));
    onSave(newBook);
    onCancel();
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handlePagesChange = (e) => {
    setPages(e.target.value);
  };

  return (
    <div className="add-book-form">
      <label>
        Название:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        {titleError && <span style={{ color: 'red' }}>{titleError}</span>}
      </label>

      <label>
        Год издания:
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        {yearError && <span style={{ color: 'red' }}>{yearError}</span>}
      </label>

      <label>
        Количество страниц:
        <input type="number" value={pages} onChange={handlePagesChange} />
        {pagesError && <span style={{ color: 'red' }}>{pagesError}</span>}
      </label>

      <label>
        Жанр:
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Выберите жанр</option>
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {genreError && <span style={{ color: 'red' }}>{genreError}</span>} {/* Выводим ошибку для жанра */}
      </label>

      <div className="button-group">
        <button type="submit" onClick={handleSaveClick}>
          Сохранить
        </button>
        <button type="button" onClick={handleCancelClick}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default AddBookForm;
