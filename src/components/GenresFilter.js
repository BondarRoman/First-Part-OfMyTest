import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGenre, addGenre, deleteGenre } from './reducers/dataWritersReducer';
import './styles/GenresFilter.css'; // Import the CSS file

const GenresFilter = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.dataWriters.genres);
  const selectedGenre = useSelector((state) => state.dataWriters.selectedGenre);

  const [showAllGenres, setShowAllGenres] = useState(false);
  const [newGenre, setNewGenre] = useState('');

  const handleGenreClick = (genre) => {
    dispatch(setSelectedGenre(genre));
  };

  const toggleAllGenres = () => {
    setShowAllGenres(!showAllGenres);
  };

  const handleAddGenre = () => {
    if (newGenre.trim() !== '') {
      dispatch(addGenre(newGenre));
      setNewGenre('');
    }
  };

  const handleDeleteGenre = (genre) => {
    dispatch(deleteGenre(genre));
  };

  return (
    <div>
      {showAllGenres ? (
        <>
        <div className="genres-filter-container">
               <h1>Все жанры:</h1>
               <div className="genres-list">
                 {genres.map((genre) => (
                   <div key={genre}>
                     <button
                       onClick={() => handleGenreClick(genre)}
                       style={{ fontWeight: selectedGenre === genre ? 'bold' : 'normal' }}
                     >
                       {genre}
                     </button>
                     <button onClick={() => handleDeleteGenre(genre)}>Удалить</button>
                   </div>
                 ))}
               </div>
               <button className='btn-show' onClick={() => { handleGenreClick(null); toggleAllGenres(); }}>Скрыть жанры</button>
               <div className="add-genre">
                 <input type="text" value={newGenre} onChange={(e) => setNewGenre(e.target.value)} />
                 <button onClick={handleAddGenre}>Добавить жанр</button>
               </div>
          </div>
        </>
        
      ) : (
        <button className='btn-show' onClick={toggleAllGenres}>Показать все жанры</button>
      )}
    </div>
  );
};

export default GenresFilter;
