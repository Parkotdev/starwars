import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: JSON.parse(localStorage.getItem('page') || '1'),
  totalPeoples: JSON.parse(localStorage.getItem('totalPeoples') || '[]'),
  peoplesList: JSON.parse(localStorage.getItem('peoples') || '[]'),
  favoritesList: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialState,
  reducers: {
    addTotalPeoples: (state, action) => {
      state.totalPeoples = action.payload;
    },
    addPage: (state) => {
      state.page = state.page + 1;
    },
    addPeople: (state, action) => {
      state.peoplesList = [...state.peoplesList, ...action.payload];
    },
    addFavorite: (state, action) => {
      state.favoritesList = [...state.favoritesList, action.payload];
      state.peoplesList = state.peoplesList.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, favorite: true };
        }
        return { ...item };
      });
    },
    removeFavorite: (state, action) => {
      state.favoritesList = state.favoritesList.filter(
        (people) => people.id !== action.payload
      );
      state.peoplesList = state.peoplesList.map((item) => {
        if (item.id === action.payload) {
          return { ...item, favorite: false };
        }
        return { ...item };
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTotalPeoples,
  addPage,
  addPeople,
  addFavorite,
  removeFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
