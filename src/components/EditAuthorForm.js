









import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthor } from './reducers/dataWritersReducer'; // добавить экшен для обновления авторов


const EditAuthorForm = ({ author, onSave, onCancel }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(author.name);
  const [surname, setSurname] = useState(author.surname);
  const [fathersname, setFathersname] = useState(author.fathersname);
  const [birthdate, setBirthdate] = useState(author.birthdate);
  
  const [books, setBooks] = useState(author.books);

  const handleSaveClick = (e) => {
    e.preventDefault();
    dispatch(updateAuthor({ ...author, name, surname, fathersname, birthdate,  books }));
    onSave({ ...author, name, surname, fathersname, birthdate, books });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleSaveClick}>
      {/* ИЗМЕНЕНИЯ ИМЕНИ АВТОРА */}
      <label>
        Имя:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {/* ИЗМЕНЕНИЯ ФАМИЛИИ АВТОРА */}
      <label>
        ФАМИЛИЯ:
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </label>
      {/* ИЗМЕНЕНИЯ ОТЧЕСТВА АВТОРА */}
      <label>
       ОТЧЕСТВО:
        <input
          type="text"
          value={fathersname}
          onChange={(e) => setFathersname(e.target.value)}
        />
      </label>

      <label>
        Дата рождения:
        <input
          type="text"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </label>
     
      <label>
        Книги:
        
        <div>
          {books.map((book, index) => (
            <div className="AuthorsData" key={index}>
            <div>{book.title}</div>
            <div>{book.year}</div>
          </div>
          ))
            
          }
        </div>
      </label>

      <div>
        
        <button type='submit'>Сохранить</button>

        <button onClick={() =>handleCancelClick}>Отменить</button>
      </div>
    </form>
  )
  }
  export default EditAuthorForm