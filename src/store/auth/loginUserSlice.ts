import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginUserData } from '../../types';


const initialState: ILoginUserData = {
    mb_id: "",
    mb_name: "",
    mb_nick: "",
    mb_icon_path: "",
    mb_image_path: "",
    mb_profile: "",
    mb_memo_cnt: 0,
    mb_point: 0,
    mb_scrap_cnt: 0,
}


export const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {
        setLoginUser: (state, action: PayloadAction<ILoginUserData>) => {
            Object.assign(state, action.payload);
        },
        logout: (state) => {
            Object.assign(state, initialState);
        }
    },
});


export const { setLoginUser, logout } = loginUserSlice.actions;

export default loginUserSlice.reducer;