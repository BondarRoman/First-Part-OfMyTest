import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAuthor } from './reducers/dataWritersReducer';

const AddAuthorForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [fathersname, setFathersname] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [books, setBooks] = useState('');

  const handleSaveClick = (e) => {
    e.preventDefault();

    // Проверка на обязательное заполнение всех полей
    if (!name || !surname || !birthdate || !books) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    const author = {
      name,
      fathersname,
      surname,
      birthdate,
      books: books.split('\n'),
    };
    dispatch(addAuthor(author));
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form>
      <label>
        Имя:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Отчество:
        <input type="text" value={fathersname} onChange={(e) => setFathersname(e.target.value)} />
      </label>
      <label>
        Фамилия:
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
      </label>
      <label>
        Дата рождения:
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
      </label>
      <label>
        Основные работы:
        <textarea value={books} onChange={(e) => setBooks(e.target.value)} required />
      </label>
      <button type="submit" onClick={handleSaveClick}>Добавить автора</button>
      <button onClick={handleCancelClick}>Отменить</button>
    </form>
  );
};

export default AddAuthorForm;
