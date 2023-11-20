import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import messReducers from "./features/mess";

const { messReducer, messQrReducer } = messReducers;

const store = configureStore({
  reducer: {
    user: userReducer,
    mess: messReducer,
    messQr: messQrReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
