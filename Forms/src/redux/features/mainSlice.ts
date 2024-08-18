import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { countries } from '../../constants/countries';

export interface MainState {
  countries: string[];
}

const initialState: MainState = {
  countries: countries,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addCountry: function (state, action: PayloadAction<string>) {
      state.countries = [...state.countries, action.payload];
    },
  },
});

export const { addCountry } = mainSlice.actions;

export default mainSlice.reducer;
