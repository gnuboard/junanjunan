import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './auth/tokenSlice';
import loginUserReducer from './auth/loginUserSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    loginUser: loginUserReducer,
  },
});
