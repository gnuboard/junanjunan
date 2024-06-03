import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthTokenState } from '../../types';

const initialState: IAuthTokenState = {
  access_token: null,
  refresh_token: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthTokenState>) => {
      Object.assign(state, action.payload);
    },
    logout: (state) => {
      Object.assign(state, initialState);
    }
  },
});

export const { setCredentials, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
