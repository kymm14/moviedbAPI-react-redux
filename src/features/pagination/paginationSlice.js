import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: 1,
  nowPlaying: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    savePopular: (state, action) => {
      state.popular = action.payload;
    },
    saveNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
  },
});

export const { savePopular, saveNowPlaying } = paginationSlice.actions;

export default paginationSlice.reducer;
