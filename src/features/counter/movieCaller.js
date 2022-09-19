import { createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  movie: null,
  singleMovie:null,
  search:null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    fetchAllMovie: (state,{payload}) => {
      state.movie = payload;
    },
    fetchSingle: (state,{payload}) => {
      state.singleMovie = payload;
    },
    fetchSearch:(state,{payload}) =>{
      state.search = payload
    }
  },
  
 
});

export const { fetchAllMovie,fetchSingle,fetchSearch} = movieSlice.actions;

export const allMovieData = (state) => state.movie.movie;
export const singleData = (state) => state.movie.singleMovie;
export const searchData = (state) => state.movie.search



export default movieSlice.reducer;
