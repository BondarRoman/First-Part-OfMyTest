// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import dataWritersReducer from './dataWritersReducer'

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   dataWriters: dataWritersReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   persistedReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// const persistor = persistStore(store);

// export { store, persistor };

// Откоментировать когда дойдет до этапа включать localStorage(ОЧЕНЬ ВАЖНО!)
// Откоментировать когда дойдет до этапа включать localStorage(ОЧЕНЬ ВАЖНО!)
// Откоментировать когда дойдет до этапа включать localStorage(ОЧЕНЬ ВАЖНО!)
// Откоментировать когда дойдет до этапа включать localStorage(ОЧЕНЬ ВАЖНО!)
// Откоментировать когда дойдет до этапа включать localStorage(ОЧЕНЬ ВАЖНО!)





import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import dataWritersReducer from './dataWritersReducer'

const rootReducer = combineReducers({
  dataWriters: dataWritersReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
