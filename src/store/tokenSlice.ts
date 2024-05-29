import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthTokenState } from '../types';

const initialState: IAuthTokenState = {
  access_token: "",
  refresh_token: "",
};

export const tokenSlice = createSlice({
  name: "token",
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

export const { setCredentials, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
