import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PersonType } from '../../types/peopleType';

export interface MainState {
  name: string;
  people: PersonType[];
  selectedPeople: PersonType[];
}

const initialState: MainState = {
  name: '',
  people: [],
  selectedPeople: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSearch: function (state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setPeople: function (state, action: PayloadAction<PersonType[]>) {
      state.people = action.payload;
    },
    selectPeople: function (state, action: PayloadAction<{ person: PersonType; isSelected: boolean }>) {
      const { person, isSelected } = action.payload;
      let result;
      if (isSelected) {
        result = state.selectedPeople.filter((cur) => cur.name !== person.name);
        state.selectedPeople = result;
      } else {
        result = [...state.selectedPeople, person];
        state.selectedPeople = result;
      }
    },
    unselectPeople: function (state) {
      state.selectedPeople = [];
    },
  },
});

export const { setSearch, setPeople, selectPeople, unselectPeople } = mainSlice.actions;

export default mainSlice.reducer;
