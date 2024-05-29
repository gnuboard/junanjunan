import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthToken } from '../types';

const initialState: IAuthToken = {
  access_token: null,
  refresh_token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthToken>) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
    }
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
