import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeReducer from '../reducers/themeReducer';
import contractReducer from '../reducers/contractReducer';
import userReducer from '../reducers/userReducer';

// ***Redux with persistance
const persistConfig = {
  key: 'Logshahah',
  storage: storage,
  blacklist: ['contractReducer', 'userReducer'],
};

const combinedReducers = combineReducers({
  themeReducer,
  contractReducer,
  userReducer,
});

const Reducer = persistReducer(persistConfig, combinedReducers);

// ***Redux without persistance
// const Reducer = combineReducers({ booksReducer, articlesReducer });

//******************************************************************************************

// ***For Development:
const middleware = applyMiddleware(thunk, logger);
const store = createStore(Reducer, middleware);

// ***For Production:
// const store = createStore(Reducer);

const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;

export { persistor, store };
