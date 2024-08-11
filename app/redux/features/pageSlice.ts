import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createPageNums } from '~/utils/createPageNums';

export interface PageState {
  currentPage: number;
  pages: number[];
}

const initialState: PageState = {
  currentPage: 1,
  pages: [],
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: function (state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPages: function (state, action: PayloadAction<number>) {
      state.pages = createPageNums(action.payload);
    },
  },
});

export const { setCurrentPage, setPages } = pageSlice.actions;

export default pageSlice.reducer;
