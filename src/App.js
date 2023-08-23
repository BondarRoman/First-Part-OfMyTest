import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedAuthor,
  setEditingAuthor,
  setAddingAuthor,
  deleteAuthor,
  saveAuthor,
  addAuthor,
} from './components/reducers/dataWritersReducer';
import AuthorDetails from './components/AuthorDetails';
import EditAuthorForm from './components/EditAuthorForm';
import AddAuthorForm from './components/AddAuthorForm';
import GenresFilter from './components/GenresFilter';
import BooksByGenre from './components/BooksByGenre'; // Импортируем компонент BooksByGenre

function App() {
  const dispatch = useDispatch();

  const authors = useSelector((state) => state.dataWriters.authors);
  const selectedAuthor = useSelector((state) => state.dataWriters.selectedAuthor);
  const editingAuthor = useSelector((state) => state.dataWriters.editingAuthor);
  const addingAuthor = useSelector((state) => state.dataWriters.addingAuthor);

  const handleDeleteAuthor = (index) => {
    dispatch(deleteAuthor(index));
  };

  const handleShowDetails = (author) => {
    dispatch(setSelectedAuthor(author));
  };

  const handleEditAuthor = (author) => {
    dispatch(setEditingAuthor(author));
  };

  const handleSaveAuthor = (author) => {
    dispatch(saveAuthor(author));
  };

  const handleAddAuthor = (author) => {
    dispatch(addAuthor(author));
  };

  return (
    <div className="App">
      <header className="App-header">
        <GenresFilter />
        {selectedAuthor ? (
          <div>
            <AuthorDetails author={selectedAuthor} />
            <button onClick={() => dispatch(setSelectedAuthor(null))}>Назад</button>
          </div>
        ) : editingAuthor ? (
          <div>
            <EditAuthorForm
              author={editingAuthor}
              onSave={handleSaveAuthor}
              onCancel={() => dispatch(setEditingAuthor(null))}
            />
          </div>
        ) : addingAuthor ? (
          <div>
            <AddAuthorForm
              onAddAuthor={handleAddAuthor}
              onCancel={() => dispatch(setAddingAuthor(false))}
            />
          </div>
        ) : (
          <div className="authors-container">
          <div className="column">
            
            <span className="column-title-author">Авторы:</span>
            <div className='data-authors'>
            {authors &&
              authors.map((author, index) => (
                <div className="author-data" key={index}>
                  <div className="author-info">
                    <div className="author-name">
                      <span className="author-firstname">{author.name}</span>
                      <span className="author-fathersname">{`${author.fathersname[0]}.`}</span>
                      <span className="author-surname">{`${author.surname[0]}.`}</span>
                    </div>
                  </div>
                </div>
              ))}
             </div>
          </div>

          <div className="column">
            <span className="column-title">Книг в базе:</span>
            {authors &&
              authors.map((author, index) => (
                <div className="author-books" key={index}>
                  {author.books.length}
                </div>
              ))}
          </div>

          <div className="column">
            <div className="column-buttons">
             
                 {authors &&
                authors.map((author, index) => (
                  <div className="author-actions" key={index}>
                    <button className="edit-author" onClick={() => handleEditAuthor(author)}>
                      Редактировать
                    </button>
                    <button className="delete-author" onClick={() => handleDeleteAuthor(index)}>
                      Удалить
                    </button>
                    <button className="show-details" onClick={() => handleShowDetails(author)}>
                      Детали
                    </button>
                  </div>
                ))}
             
             
            </div>
          </div>

          <button className="add-author" onClick={() => dispatch(setAddingAuthor(true))}>
            Добавить автора
          </button>
        </div>
        )}

        {/* Выводим компонент BooksByGenre */}
        <BooksByGenre />
      </header>
    </div>
  );
}

export default App;
