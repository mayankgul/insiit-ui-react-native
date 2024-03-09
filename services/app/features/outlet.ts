import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Outlet, OutletState } from "../../../models/outlet.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PATH_TO_OUTLET_LOCAL_STORAGE } from "../../../models/constants";

const initialState: OutletState = {
  loading: null,
  error: null,
  outlets: null,
};

export const getOutletStorage = createAsyncThunk(
  "outlet/getStorage",
  async (): Promise<Outlet[] | null> => {
    const outlets = await AsyncStorage.getItem(PATH_TO_OUTLET_LOCAL_STORAGE);
    if (outlets) {
      return JSON.parse(outlets);
    } else {
      return null;
    }
  }
);

export const setOutletStorage = createAsyncThunk(
  "outlet/setStorage",
  async (outlets: Outlet[]): Promise<Outlet[]> => {
    await AsyncStorage.removeItem(PATH_TO_OUTLET_LOCAL_STORAGE);
    await AsyncStorage.setItem(
      PATH_TO_OUTLET_LOCAL_STORAGE,
      JSON.stringify(outlets)
    );
    return outlets;
  }
);

export const removeOutletStorage = createAsyncThunk(
  "outlet/removeStorage",
  async (): Promise<void> => {
    await AsyncStorage.removeItem(PATH_TO_OUTLET_LOCAL_STORAGE);
  }
);

const outletSlice = createSlice({
  name: "outlet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOutletStorage.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
      state.outlets = null;
    });

    builder.addCase(getOutletStorage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.outlets = action.payload;
    });

    builder.addCase(getOutletStorage.rejected, (state, action) => {
      state.loading = false;
      state.error = "Error fetching outlet from storage";
      state.outlets = null;
    });

    builder.addCase(setOutletStorage.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
      state.outlets = null;
    });

    builder.addCase(setOutletStorage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.outlets = action.payload;
    });

    builder.addCase(setOutletStorage.rejected, (state, action) => {
      state.loading = false;
      state.error = "Error setting outlet to storage";
      state.outlets = null;
    });

    builder.addCase(removeOutletStorage.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
      state.outlets = null;
    });

    builder.addCase(removeOutletStorage.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = null;
      state.outlets = null;
    });

    builder.addCase(removeOutletStorage.rejected, (state, action) => {
      state.loading = false;
      state.error = "Error removing outlet from storage";
      state.outlets = null;
    });
  },
});

export default outletSlice.reducer;
