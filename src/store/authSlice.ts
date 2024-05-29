import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthTokenState } from '../types';

const initialState: IAuthTokenState = {
  access_token: "",
  refresh_token: "",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthTokenState>) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    logout: (state) => {
      state.access_token = "";
      state.refresh_token = "";
    }
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
