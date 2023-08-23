import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAuthor} from './reducers/dataWritersReducer';
import AddBookForm from './AddBookForm';
import './styles/AddAuthorForm.css';

const AddAuthorForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [fathersname, setFathersname] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    // Валидация данных
    if (!name || !surname || !birthdate || books.length === 0) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    if (!/^[A-ZА-ЯЁ][a-zа-яё]*$/.test(name)) {
      setNameError('Имя должно начинаться с большой буквы.');
      return;
    } else {
      setNameError('');
    }

    if (!/^[A-ZА-ЯЁ][a-zа-яё]*$/.test(surname)) {
      setSurnameError('Фамилия должна начинаться с большой буквы.');
      return;
    } else {
      setSurnameError('');
    }

    if (fathersname && !/^[A-ZА-ЯЁ][a-zа-яё]*$/.test(fathersname)) {
      setSurnameError('Отчество должно начинаться с большой буквы.');
      return;
    } else {
      setSurnameError('');
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
      setBirthdateError('Введите дату рождения в формате ГГГГ-ММ-ДД.');
      return;
    } else {
      setBirthdateError('');
    }

    const author = {
      name,
      fathersname,
      surname,
      birthdate,
      books: books.map((book) => ({ ...book, pages: book.pages })), // Включаем количество страниц для каждой книги
    };
    dispatch(addAuthor(author));
    clearForm();
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    onCancel();
    clearForm();
  };

  const handleBookSave = (book) => {
    setBooks([...books, book]);
  };

  const clearForm = () => {
    setName('');
    setFathersname('');
    setSurname('');
    setBirthdate('');
    setBooks([]);
    setShowAddForm(false);
    setNameError('');
    setSurnameError('');
    setBirthdateError('');
  };

  return (
    <form className="add-author-form">
      <label>
        Имя:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
      </label>
      <label>
        Отчество:
        <input
          type="text"
          value={fathersname}
          onChange={(e) => setFathersname(e.target.value)}
        />
      </label>
      <label>
        Фамилия:
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        {surnameError && <span style={{ color: 'red' }}>{surnameError}</span>}
      </label>
      <label>
        Дата рождения:
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
        {birthdateError && <span style={{ color: 'red' }}>{birthdateError}</span>}
      </label>
      <label>
        Книги:
        {books.map((book) => (
          <div key={book.id}>
            {book.title} ({book.year}г.) 
          </div>
        ))}
        {showAddForm ? (
          <AddBookForm onSave={handleBookSave} onCancel={handleCancelAdd} />
        ) : (
          <button className="add-book-button" onClick={handleAddClick}>
            Добавить книгу
          </button>
        )}
      </label>
      <div className="button-group">
        <button type="submit" onClick={handleSaveClick}>
          Добавить автора
        </button>
        <button className="cancel-button" onClick={handleCancelClick}>
          Отменить
        </button>
      </div>
    </form>
  );
};

export default AddAuthorForm;
