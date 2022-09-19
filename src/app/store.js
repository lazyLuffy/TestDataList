import { configureStore } from '@reduxjs/toolkit';
import  movieSlice  from '../features/counter/movieCaller';

export const store = configureStore({
  reducer: {
    movie: movieSlice,
  },
});
