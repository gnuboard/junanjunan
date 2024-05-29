import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './auth/tokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});
