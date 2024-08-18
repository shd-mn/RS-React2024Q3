import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userType } from '../../types/userType';

export interface UserState {
  usersData: userType[];
}

const initialState: UserState = {
  usersData: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: function (state, action: PayloadAction<userType>) {
      state.usersData = [...state.usersData, action.payload];
    },
  },
});

export const { addUserData } = userSlice.actions;

export default userSlice.reducer;
