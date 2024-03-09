import { createSlice } from "@reduxjs/toolkit";

interface initialHomeState {
  scrollOffsetY: number | null;
}

const initialState: initialHomeState = {
  scrollOffsetY: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setScrollOffsetY: (state, action) => {
      state.scrollOffsetY = action.payload;
    },
  },
});

export const { setScrollOffsetY } = homeSlice.actions;
export default homeSlice.reducer;
