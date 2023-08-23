
import { v4 as uuidv4 } from 'uuid';

const SET_SELECTED_AUTHOR = "SET_SELECTED_AUTHOR"
const SET_EDITING_AUTHOR = "SET_EDITING_AUTHOR"
const DELETE_AUTHOR = "DELETE_AUTHOR"
const SAVE_AUTHOR = "SAVE_AUTHOR"
const ADD_AUTHOR = "ADD_AUTHOR"
const UPDATE_AUTHOR = "UPDATE_AUTHOR";
const SET_ADDING_AUTHOR = "SET_ADDING_AUTHOR"
// Для книг
const UPDATE_BOOK = "UPDATE_BOOK";
const SET_SELECTED_BOOK = "SET_SELECTED_BOOK";
const SET_EDITING_BOOK = "SET_EDITING_BOOK";
const DELETE_BOOK = "DELETE_BOOK";
const SAVE_BOOK = "SAVE_BOOK";
const ADD_BOOK = "ADD_BOOK";

const UPDATE_BOOK_GENRES = "UPDATE_BOOK_GENRES";
const SET_SELECTED_GENRE = "SET_SELECTED_GENRE";
const ADD_GENRE = "ADD_GENRE"; // Добавляем новый action type для добавления жанров
const SET_SELECTED_GENRE_BOOKS = "SET_SELECTED_GENRE_BOOKS";
const DELETE_GENRE = "DELETE_GENRE";
const SELECT_GENRE_FOR_BOOK = "SELECT_GENRE_FOR_BOOK"; // Новый action type для выбора жанра книги



const initialState = {
  authors: [
    {
      id: uuidv4(),
      name: "Александр",
      surname: "Пушкин",
      fathersname: "Сергеевич",
      birthdate: '06.06.1799',
      books: [
        {
          id: uuidv4(),
          title: "Евгений Онегин",
          year: "1823-1832",
          genres: ["Роман в стихах", "Лирическая поэма"],
          pages: 300
        },
        {
          id: uuidv4(),
          title: "Капитанская дочка",
          year: "1836",
          genres: ["Роман"],
          pages: 124
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Михаил",
      surname: "Лермонтов",
      fathersname: "Юрьевич",
      birthdate: '15.10.1814',
      books: [
        {
          id: uuidv4(),
          title: "Мцыри",
          year: "1840",
          genres: ["Поэма"],
          pages: 612
        },
        {
          id: uuidv4(),
          title: "Герой нашего времени",
          year: "1839",
          genres: ["Роман в стихах"],
          pages: 240,
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Николай",
      surname: "Гоголь",
      fathersname: "Васильевич",
      birthdate: '31.03.1809',
      books: [
        {
          id: uuidv4(),
          title: "Мертвые души",
          year: "1842",
          genres: ["Поэма", "Сатира"],
          pages: 352,
        },
        {
          id: uuidv4(),
          title: "Ревизор",
          year: "1836",
          genres: ["Комедия"],
          pages: 192,
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Федор",
      surname: "Достоевский",
      fathersname: "Михайлович",
      birthdate: '11.11.1821',
      books: [
        {
          id: uuidv4(),
          title: "Преступление и наказание",
          year: "1866",
          genres: ["Роман", "Философский роман"],
          pages: 672,
        },
        {
          id: uuidv4(),
          title: "Братья Карамазовы",
          year: "1880",
          genres: ["Роман"],
          pages: 824,
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Лев",
      surname: "Толстой",
      fathersname: "Николаевич",
      birthdate: '09.09.1828',
      books: [
        {
          id: uuidv4(),
          title: "Война и мир",
          year: "1869",
          genres: ["Роман-эпопея"],
          pages: 1225,
        },
        {
          id: uuidv4(),
          title: "Анна Каренина",
          year: "1877",
          genres: ["Роман"],
          pages: 864,
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Антон",
      surname: "Чехов",
      fathersname: "Павлович",
      birthdate: '29.01.1860',
      books: [
        {
          id: uuidv4(),
          title: "Вишнёвый сад",
          year: "1904",
          genres: ["Драма"],
          pages: 96,
        },
        {
          id: uuidv4(),
          title: "Дама с собачкой",
          year: "1899",
          genres: ["Рассказ"],
          pages: 56,
        },
      ],
    },
  
  ],
  selectedAuthor: null,
  editingAuthor: null,
  addingAuthor: null, // добавляем новое поле для добавления автора
  editingBook: null,
  selectedGenre: null, // Храним выбранный жанр для фильтрации книг
  genres: [], // Изначально пустой массив жанров
  selectedGenreBooks: null, // Список книг с выбранным жанром
  
};

 


const dataWritersReducer = (state = initialState, action) => {

  const getUniqueGenres = () => {
    const allGenres = state.authors.reduce((genres, author) => {
      author.books.forEach((book) => {
        genres.push(...book.genres);
      });
      return genres;
    }, []);
    return Array.from(new Set(allGenres));
  };

  const getBooksByGenre = (genre) => {
    return (dispatch, getState) => {
      const state = getState();
      const authors = state.dataWriters.authors;
      const books = authors.flatMap((author) =>
        author.books.filter((book) => book.genres.includes(genre))
      );
      dispatch(setSelectedGenreBooks(genre, books));
    };
  };

  switch (action.type) {
    case SET_SELECTED_AUTHOR:
      return { ...state, selectedAuthor: action.payload };
    case SET_EDITING_AUTHOR:
      return { ...state, editingAuthor: action.payload };
    case SET_ADDING_AUTHOR:
      return { ...state, addingAuthor: action.payload };
    case DELETE_AUTHOR:
      const updatedAuthors = [...state.authors];
      updatedAuthors.splice(action.payload, 1);
      return { ...state, authors: updatedAuthors };
    case SAVE_AUTHOR:
      const authors = [...state.authors];
      const index = authors.findIndex((a) => a.name === action.payload.name);
      if (index >= 0) {
        authors[index] = action.payload;
        return { ...state, authors, editingAuthor: null };
      }
      return state;
    case ADD_AUTHOR:
      return { ...state, authors: [...state.authors, action.payload], addingAuthor: null };
    case UPDATE_AUTHOR:
      const updatedAuthorIndex = state.authors.findIndex(
        (author) => author.id === action.payload.id
      );
      if (updatedAuthorIndex !== -1) {
        const updatedAuthors = [...state.authors];
        updatedAuthors[updatedAuthorIndex] = action.payload;
        return { ...state, authors: updatedAuthors, editingAuthor: null, editingBook: null };
      }
      return state;

    case SET_SELECTED_GENRE_BOOKS:
      return { ...state, selectedGenreBooks: action.payload };

    case UPDATE_BOOK_GENRES:
      const updatedAuthorsWithGenres = state.authors.map((author) => {
        if (author.id === action.payload.authorId) {
          return {
            ...author,
            books: author.books.map((book) =>
              book.id === action.payload.bookId
                ? { ...book, genres: action.payload.updatedBook.genres }
                : book
            ),
          };
        }
        return author;
      });
      return { ...state, authors: updatedAuthorsWithGenres };

    case SET_SELECTED_GENRE:
      return {
        ...state,
        selectedGenre: action.payload.selectedGenre,
        selectedGenreBooks: state.authors.flatMap((author) =>
          author.books.filter((book) => book.genres.includes(action.payload.selectedGenre))
        ),
      };

      case UPDATE_BOOK:
        const updatedAuthorsForBookIndex = state.authors.findIndex(
          (author) => author.id === action.payload.authorId
        );
        if (updatedAuthorsForBookIndex !== -1) {
          const updatedAuthorsForBook = [...state.authors];
          const updatedAuthorForBook = { ...updatedAuthorsForBook[updatedAuthorsForBookIndex] };
          const updatedBooksForAuthor = [...updatedAuthorForBook.books];
          const updatedBookIndex = updatedBooksForAuthor.findIndex(
            (book) => book.id === action.payload.bookId
          );
          if (updatedBookIndex !== -1) {
            // Обновляем данные о книге, включая title, year и pages
            updatedBooksForAuthor[updatedBookIndex] = {
              ...action.payload.updatedBook,
              title: action.payload.updatedBook.title,
              year: action.payload.updatedBook.year,
              pages: action.payload.updatedBook.pages // Добавляем обновление количества страниц
            };
            updatedAuthorForBook.books = updatedBooksForAuthor;
            updatedAuthorsForBook[updatedAuthorsForBookIndex] = updatedAuthorForBook;
            return { ...state, authors: updatedAuthorsForBook, editingBook: null };
          }
        }
        return state;

    case ADD_GENRE:
      const newGenres = [...state.genres, action.payload.genre];
      return { ...state, genres: Array.from(new Set(newGenres)) };

    case SET_EDITING_BOOK:
      return { ...state, editingBook: action.payload };

    case DELETE_GENRE:
      // Фильтруем массив жанров и удаляем выбранный жанр
      const updatedGenres = state.genres.filter((genre) => genre !== action.payload);
      return { ...state, genres: updatedGenres, selectedGenre: null, selectedGenreBooks: null }

    case SELECT_GENRE_FOR_BOOK:
        return { ...state, selectedGenre: action.payload }; 

    case SAVE_BOOK:
      const books = [...state.authors.books];
      const i = books.findIndex((a) => a.name === action.payload.name);
      if (i >= 0) {
        books[i] = action.payload;
        return { ...state, books, editingBook: null };
      }
      return state;

     default:
       return { ...state, genres: getUniqueGenres(), selectedGenreBooks: getBooksByGenre(state.selectedGenre) };
     }
};
    
  export const setSelectedAuthor = (author) => ({
  type: SET_SELECTED_AUTHOR,
  payload: author,
});

export const setEditingAuthor = (author) => ({
  type: SET_EDITING_AUTHOR,
  payload: author,
});

export const deleteAuthor = (index) => ({
  type: DELETE_AUTHOR,
  payload: index,
});

export const saveAuthor = (author) => ({
  type: SAVE_AUTHOR,
  payload: author,
});

export const addAuthor = (author) => ({
  type: ADD_AUTHOR,
  payload: author,
});

export const updateAuthor = (author) => ({
  type: UPDATE_AUTHOR,
  payload: author,
});

export const setAddingAuthor = (author) => ({
  type: SET_ADDING_AUTHOR,
  payload: author,
});

// Продолжение для книг

export const setSelectedBook = (book) => ({
  type: SET_SELECTED_BOOK,
  payload: book,
});

export const setEditingBook = (book) => ({
  type: SET_EDITING_BOOK,
  payload: book,
});

export const deleteBook = (authorIndex, bookIndex) => ({
  type: DELETE_BOOK,
  payload: { authorIndex, bookIndex },
});

export const saveBook = (authorIndex, book) => ({
  type: SAVE_BOOK,
  payload: { authorIndex, book },
});

export const addBook = (authorId, book) => ({
  type: ADD_BOOK,
  payload: { authorId, book },
});

export const updateBook = (authorId, bookId, updatedBook) => ({
  type: UPDATE_BOOK,
  payload: { authorId, bookId, updatedBook },
});

// Genres
export const updateBookGenres = (authorId, bookId, updatedBook) => ({
  type: UPDATE_BOOK_GENRES,
  payload: { authorId, bookId, updatedBook },
});

export const setSelectedGenre = (genre) => ({
  type: SET_SELECTED_GENRE,
  payload: { selectedGenre: genre },
});

export const addGenre = (genre) => ({
  type: ADD_GENRE,
  payload: { genre },
});

export const setSelectedGenreBooks = (genre, books) => ({
  type: SET_SELECTED_GENRE_BOOKS,
  payload: { genre, books },
});

export const deleteGenre = (genre) => ({
  type: DELETE_GENRE,
  payload: genre,
});

export const selectGenreForBook = (genre) => ({
  type: SELECT_GENRE_FOR_BOOK,
  payload: genre,
});

  export default dataWritersReducer;