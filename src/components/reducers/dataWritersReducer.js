
import { v4 as uuidv4 } from 'uuid';
// const SET_NAME = "SET_NAME"
// const SET_SURNAME = "SET_SURNAME"
// const SET_FATHERSNAME = "SET_FATHERSNAME"
// const SET_BIRTHDAY = "SET_BIRTHDAY"
// const SET_BOOKS = "SET_BOOKS"


const SET_SELECTED_AUTHOR = "SET_SELECTED_AUTHOR"
const SET_EDITING_AUTHOR = "SET_EDITING_AUTHOR"
const DELETE_AUTHOR = "DELETE_AUTHOR"
const SAVE_AUTHOR = "SAVE_AUTHOR"
const ADD_AUTHOR = "ADD_AUTHOR"
const UPDATE_AUTHOR = "UPDATE_AUTHOR";
const SET_ADDING_AUTHOR = "SET_ADDING_AUTHOR"
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
        },
        {
          id: uuidv4(),
          title: "Капитанская дочка",
          year: "1836",
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
        },
        {
          id: uuidv4(),
          title: "Герой нашего времени",
          year: "1839",
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
        },
        {
          id: uuidv4(),
          title: "Ревизор",
          year: "1836",
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
        },
        {
          id: uuidv4(),
          title: "Братья Карамазовы",
          year: "1880",
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
        },
        {
          id: uuidv4(),
          title: "Анна Каренина",
          year: "1877",
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
        },
        {
          id: uuidv4(),
          title: "Дама с собачкой",
          year: "1899",
        },
      ],
    },
  ],
  selectedAuthor: null,
  editingAuthor: null,
  addingAuthor: null, // добавляем новое поле для добавления автора
};

 
  

const dataWritersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_AUTHOR:
      return { ...state, selectedAuthor: action.payload };
    case SET_EDITING_AUTHOR:
      return { ...state, editingAuthor: action.payload };
    case SET_ADDING_AUTHOR: // добавляем новый кейс
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
      return { ...state, authors: [...state.authors, action.payload], addingAuthor: null }; // обнуляем addingAuthor после добавления
    case UPDATE_AUTHOR:
      const updatedAuthorIndex = state.authors.findIndex(
        (author) => author.id === action.payload.id
      );
      if (updatedAuthorIndex !== -1) {
        const updatedAuthors = [...state.authors];
        updatedAuthors[updatedAuthorIndex] = action.payload;
        return { ...state, authors: updatedAuthors, editingAuthor: null };
      }
      return state;
    default:
      return state;
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

  export default dataWritersReducer;