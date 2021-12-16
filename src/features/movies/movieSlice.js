import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MovieApi } from "../../common/ apis/movieApi";
import { APIKEY } from "../../common/ apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const movieText = "Harry";
    const response = await MovieApi.get(
      `?apiKey=${APIKEY}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const seriesText = "Show";
    const response = await MovieApi.get(
      `?apiKey=${APIKEY}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetails = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetails",
  async (id) => {
    const response = await MovieApi.get(`?apiKey=${APIKEY}&i=${id}&plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },

  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("fetch successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("fetch rejected");
    },

    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetch Successfully");
      return { ...state, shows: payload };
    },

    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
      console.log("Fetch Successfully");
      return { ...state, selectMovieOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSice.actions;
export const getAllMovies = (state) => state.movies;
export const getAllShows = (state) => state.shows;
export const getSelectedMovieOrShow = (state) => state.selectMovieOrShow;

export default movieSice.reducer;
