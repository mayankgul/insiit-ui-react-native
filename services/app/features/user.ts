import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../../models/user.model";
import { PATH_TO_USER_LOCAL_STORAGE } from "../../../models/constants";

export const getUserStorage = createAsyncThunk(
  "user/getStorage",
  async (): Promise<User | null> => {
    const user = await AsyncStorage.getItem(PATH_TO_USER_LOCAL_STORAGE);
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
);

export const setUserStorage = createAsyncThunk(
  "user/setStorage",
  async (user: User): Promise<User> => {
    await AsyncStorage.removeItem(PATH_TO_USER_LOCAL_STORAGE);
    await AsyncStorage.setItem(
      PATH_TO_USER_LOCAL_STORAGE,
      JSON.stringify(user)
    );
    return user;
  }
);

export const removeUserStorage = createAsyncThunk(
  "user/removeStorage",
  async (): Promise<void> => {
    await AsyncStorage.removeItem(PATH_TO_USER_LOCAL_STORAGE);
  }
);

const initialState = {
  loading: null,
  user: null,
  error: null,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserStorage.pending, (state, _action) => {
      state.user = null;
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUserStorage.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getUserStorage.rejected, (state, _action) => {
      state.user = null;
      state.loading = false;
      state.error = "Error fetching user from storage";
    });

    builder.addCase(setUserStorage.pending, (state, _action) => {
      state.user = null;
      state.loading = true;
      state.error = null;
    });

    builder.addCase(setUserStorage.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(setUserStorage.rejected, (state, _action) => {
      state.user = null;
      state.loading = false;
      state.error = "Error setting user in storage";
    });

    builder.addCase(removeUserStorage.pending, (state, _action) => {
      state.user = null;
      state.loading = true;
      state.error = null;
    });

    builder.addCase(removeUserStorage.fulfilled, (state, _action) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(removeUserStorage.rejected, (state, _action) => {
      state.user = null;
      state.loading = false;
      state.error = "Error removing user from storage";
    });
  },
});

export default userSlice.reducer;
