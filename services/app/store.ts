import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import messReducers from "./features/mess";
import outletReducer from "./features/outlet";
import homeReducer from "./features/home.screen";
import outletScreenReducer from "./features/outlet.screen";

const { messReducer, messQrReducer } = messReducers;

const store = configureStore({
  reducer: {
    user: userReducer,
    mess: messReducer,
    messQr: messQrReducer,
    outlet: outletReducer,
    homeScreen: homeReducer,
    outletScreen: outletScreenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
