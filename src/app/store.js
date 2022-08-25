import { configureStore } from '@reduxjs/toolkit';

// Reducers
import favoriteReducer from '../reducers/favorite/favoriteSlice';

export default configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});
