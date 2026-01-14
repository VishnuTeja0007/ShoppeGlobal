import { createSlice } from "@reduxjs/toolkit";

// Redux slice for managing search query state
const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: ""
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
    }
  }
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
