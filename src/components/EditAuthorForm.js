
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthor, setEditingBook, updateBook } from './reducers/dataWritersReducer';
import BookForm from './BookForm';
import AddBookForm from './AddBookForm';
import './styles/EditAuthorForm.css'; // Import the CSS file for styling

const EditAuthorForm = ({ author, onSave, onCancel }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(author.name);
  const [surname, setSurname] = useState(author.surname);
  const [fathersname, setFathersname] = useState(author.fathersname);
  const [birthdate, setBirthdate] = useState(author.birthdate);
  const [books, setBooks] = useState(author.books);
  const editingBook = useSelector((state) => state.dataWriters.editingBook);
  const genres = useSelector((state) => state.dataWriters.genres);
  const [showAddForm, setShowAddForm] = useState(false);

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [fathersnameError, setFathersnameError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');

  useEffect(() => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        const updatedGenres = Array.isArray(book.genres) ? book.genres.filter((genre) => genres.includes(genre)) : [];
        return { ...book, genres: updatedGenres };
      })
    );
  }, [genres]);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleBookSave = (book) => {
    setBooks([...books, book]);
  };

  const handleEditBook = (book) => {
    dispatch(setEditingBook(book));
  };

  const handleSaveBook = (book) => {
    dispatch(updateBook(book));
  };

  const handleRemoveBookClick = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleBookChange = (id, book) => {
    setBooks(books.map((b) => (b.id === id ? { ...b, ...book } : b)));
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!name) {
      setNameError('Пожалуйста, заполните это поле.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!/^[A-ZА-Я][a-zа-я]*$/.test(name)) {
      setNameError('Первая буква должна быть заглавной.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!surname) {
      setSurnameError('Пожалуйста, заполните это поле.');
      hasError = true;
    } else {
      setSurnameError('');
    }

    if (!/^[A-ZА-Я][a-zа-я]*$/.test(surname)) {
      setSurnameError('Первая буква должна быть заглавной.');
      hasError = true;
    } else {
      setSurnameError('');
    }

    if (fathersname && !/^[A-ZА-Я][a-zа-я]*$/.test(fathersname)) {
      setFathersnameError('Первая буква должна быть заглавной.');
      hasError = true;
    } else {
      setFathersnameError('');
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
      setBirthdateError('Введите дату рождения в формате ГГГГ-ММ-ДД.');
      hasError = true;
    } else {
      setBirthdateError('');
    }

    if (hasError) {
      return;
    }

    const updatedAuthor = {
      ...author,
      name,
      surname,
      fathersname,
      birthdate,
      books,
    };

    dispatch(updateAuthor(updatedAuthor));
    onSave(updatedAuthor);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    onCancel();
  };
  return (
    <form className="edit-author-form" onSubmit={handleSaveClick}>
      {editingBook ? (
        <div>
          <BookForm
            key={editingBook.id}
            book={editingBook}
            onChange={(updatedBook) => handleBookChange(editingBook.id, updatedBook)}
            onRemove={() => handleRemoveBookClick(editingBook.id)}
            onCancel={() => dispatch(setEditingBook(null))}
            onSave={handleSaveBook}
            availableGenres={genres}
          />
        </div>
      ) : (
        <>
          <label>
            Имя:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
          </label>

          <label>
            Фамилия:
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
            {surnameError && <span style={{ color: 'red' }}>{surnameError}</span>}
          </label>

          <label>
            Отчество:
            <input type="text" value={fathersname} onChange={(e) => setFathersname(e.target.value)} />
            {fathersnameError && <span style={{ color: 'red' }}>{fathersnameError}</span>}
          </label>

          <label>
            Дата рождения:
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            {birthdateError && <span style={{ color: 'red' }}>{birthdateError}</span>}
          </label>

          <h2>Книги автора:</h2>
          {books.map((book, index) => (
            <div className="book-details" key={index}>
              <div>Название книги: {book.title}</div>
              <div>Год выпуска: {book.year}</div>
              <div>Количество страниц: {book.pages}</div> {/* Добавлено отображение количества страниц */}
              {book.genres && book.genres.length > 0 ? (
                <div>Жанр: {book.genres.join(', ')}</div>
              ) : (
                <div className="no-genre">Жанр: Нет жанра</div>
              )}
              <button onClick={() => handleEditBook(book)}>Редактировать</button>
            </div>
          ))}
          {showAddForm ? (
            <AddBookForm onSave={handleBookSave} onCancel={handleCancelAdd} />
          ) : (
            <button className="add-book-button" onClick={handleAddClick}>
              Добавить книгу
            </button>
          )}

          <div>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={handleCancelClick}>
              Отмена
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditAuthorForm;

