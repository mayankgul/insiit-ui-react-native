import { createSlice } from "@reduxjs/toolkit";

interface initialOutletState {
  activeCarouselIndex: number | null;
}

const initialState: initialOutletState = {
  activeCarouselIndex: null,
};

const outletScreenSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setActiveCarouselIndex: (state, action) => {
      state.activeCarouselIndex = action.payload;
    },
  },
});

export const { setActiveCarouselIndex } = outletScreenSlice.actions;
export default outletScreenSlice.reducer;
