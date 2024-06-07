import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from './auth/tokenSlice';
import loginUserReducer from './auth/loginUserSlice';


const rootReducer = combineReducers({
  token: tokenReducer,
  loginUser: loginUserReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'loginUser'],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);