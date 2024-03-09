import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Mess,
  MessQrState,
  MessState,
  MessTimings,
} from "../../../models/mess.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PATH_TO_MESS_LOCAL_STORAGE,
  PATH_TO_MESS_QR_LOCALSTORAGE,
} from "../../../models/constants";

/**
 * Returns ID (1, 2, 3 or 4) corresponding to current meal according to local time
 * @param  {MessTimings} timings The timings object
 * @returns {number}              ID corresponding to current meal
 */
export const computeCurrentMealId = (timings: MessTimings): 1 | 2 | 3 | 4 => {
  const current = new Date();

  const breakfastStartTime = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    parseInt(timings.breakfast.start.split(":")[0]),
    parseInt(timings.breakfast.start.split(":")[1])
  );
  const breakfastEndTime = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    parseInt(timings.breakfast.end.split(":")[0]),
    parseInt(timings.breakfast.end.split(":")[1])
  );

  const lunchStartTime = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    parseInt(timings.lunch.start.split(":")[0]),
    parseInt(timings.lunch.start.split(":")[1])
  );
  const lunchEndTime = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    parseInt(timings.lunch.end.split(":")[0]),
    parseInt(timings.lunch.end.split(":")[1])
  );

  const snacksStartTime = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    parseInt(timings.snacks.start.split(":")[0]),
    parseInt(timings.snacks.start.split(":")[1])
  );
  const snacksEndTime = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    parseInt(timings.snacks.end.split(":")[0]),
    parseInt(timings.snacks.end.split(":")[1])
  );

  const dinnerStartTime = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    parseInt(timings.dinner.start.split(":")[0]),
    parseInt(timings.dinner.start.split(":")[1])
  );
  const dinnerEndTime = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    parseInt(timings.dinner.end.split(":")[0]),
    parseInt(timings.dinner.end.split(":")[1])
  );

  if (current >= breakfastStartTime && current <= breakfastEndTime) return 1;
  if (current >= lunchStartTime && current <= lunchEndTime) return 2;
  if (current >= snacksStartTime && current <= snacksEndTime) return 3;
  if (current >= dinnerStartTime && current <= dinnerEndTime) return 4;
  if (current >= breakfastEndTime && current <= lunchStartTime) return 2;
  if (current >= lunchEndTime && current <= snacksStartTime) return 3;
  if (current >= snacksEndTime && current <= dinnerStartTime) return 4;
  if (current >= dinnerEndTime && current <= breakfastStartTime) return 1;
};

const messInitialState: MessState = {
  loading: null,
  error: null,
  id: null,
  name: null,
  location: null,
  landmark: null,
  timings: null,
  rating: null,
  menu: null,
  image: null,
};

const messQrInitialState: MessQrState = {
  loading: null,
  error: null,
  order_id: null,
  roll_no: null,
  name: null,
  email: null,
  password: null,
  mess_name: null,
};

export const getMessStorage = createAsyncThunk(
  "mess/getStorage",
  async (): Promise<Mess | null> => {
    const mess = await AsyncStorage.getItem(PATH_TO_MESS_LOCAL_STORAGE);
    if (mess) {
      return JSON.parse(mess);
    } else {
      return null;
    }
  }
);

export const setMessStorage = createAsyncThunk(
  "mess/setStorage",
  async ({
    id,
    name,
    location,
    landmark,
    timings,
    rating,
    menu,
    image,
  }: Mess): Promise<Mess> => {
    await AsyncStorage.removeItem(PATH_TO_MESS_LOCAL_STORAGE);
    await AsyncStorage.setItem(
      PATH_TO_MESS_LOCAL_STORAGE,
      JSON.stringify({
        id,
        name,
        location,
        landmark,
        timings,
        rating,
        menu,
        image,
      })
    );
    return {
      id,
      name,
      location,
      landmark,
      timings,
      rating,
      menu,
      image,
    };
  }
);

export const removeMessStorage = createAsyncThunk(
  "mess/removeStorage",
  async (): Promise<void> => {
    await AsyncStorage.removeItem(PATH_TO_MESS_LOCAL_STORAGE);
  }
);

const messSlice = createSlice({
  name: "mess",
  initialState: messInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessStorage.pending, (state, _action) => {
      state.id = null;
      state.name = null;
      state.location = null;
      state.landmark = null;
      state.timings = null;
      state.rating = null;
      state.menu = null;
      state.image = null;

      state.loading = true;
      state.error = null;
    });

    builder.addCase(getMessStorage.fulfilled, (state, action) => {
      state.id = action.payload !== null ? action.payload.id : null;
      state.name = action.payload !== null ? action.payload.name : null;
      state.location = action.payload !== null ? action.payload.location : null;
      state.landmark = action.payload !== null ? action.payload.landmark : null;
      state.timings = action.payload !== null ? action.payload.timings : null;
      state.rating = action.payload !== null ? action.payload.rating : null;
      state.menu = action.payload !== null ? action.payload.menu : null;
      state.image = action.payload !== null ? action.payload.image : null;

      state.loading = false;
      state.error = null;
    });

    builder.addCase(getMessStorage.rejected, (state, _action) => {
      state.id = null;
      state.name = null;
      state.location = null;
      state.landmark = null;
      state.timings = null;
      state.rating = null;
      state.menu = null;
      state.image = null;

      state.loading = false;
      state.error = "Error fetching mess from storage";
    });

    builder.addCase(setMessStorage.pending, (state, _action) => {
      state.id = null;
      state.name = null;
      state.location = null;
      state.landmark = null;
      state.timings = null;
      state.rating = null;
      state.menu = null;
      state.image = null;

      state.loading = true;
      state.error = null;
    });

    builder.addCase(setMessStorage.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.location = action.payload.location;
      state.landmark = action.payload.landmark;
      state.timings = action.payload.timings;
      state.rating = action.payload.rating;
      state.menu = action.payload.menu;
      state.image = action.payload.image;

      state.loading = false;
      state.error = null;
    });

    builder.addCase(setMessStorage.rejected, (state, _action) => {
      state.id = null;
      state.name = null;
      state.location = null;
      state.landmark = null;
      state.timings = null;
      state.rating = null;
      state.menu = null;
      state.image = null;

      state.loading = false;
      state.error = "Error setting mess to storage";
    });

    builder.addCase(removeMessStorage.pending, (state, _action) => {
      state.id = null;
      state.name = null;
      state.location = null;
      state.landmark = null;
      state.timings = null;
      state.rating = null;
      state.menu = null;
      state.image = null;

      state.loading = true;
      state.error = null;
    });

    builder.addCase(removeMessStorage.fulfilled, (state, _action) => {
      state.id = null;
      state.name = null;
      state.location = null;
      state.landmark = null;
      state.timings = null;
      state.rating = null;
      state.menu = null;
      state.image = null;

      state.loading = false;
      state.error = null;
    });

    builder.addCase(removeMessStorage.rejected, (state, _action) => {
      state.id = null;
      state.name = null;
      state.location = null;
      state.landmark = null;
      state.timings = null;
      state.rating = null;
      state.menu = null;
      state.image = null;

      state.loading = false;
      state.error = "Error removing mess from storage";
    });
  },
});

export const getMessQrStorage = createAsyncThunk(
  "mess_qr/getStorage",
  async (): Promise<{
    order_id: string;
    email: string;
    roll_no: string;
    name: string;
    password: string | null;
    mess_name: string;
  } | null> => {
    const messQr = await AsyncStorage.getItem(PATH_TO_MESS_QR_LOCALSTORAGE);
    if (messQr) {
      return JSON.parse(messQr);
    } else {
      return null;
    }
  }
);

export const setMessQrStorage = createAsyncThunk(
  "mess_qr/setStorage",
  async ({
    order_id,
    email,
    password,
    roll_no,
    name,
    mess_name,
  }: {
    order_id: string;
    email: string;
    roll_no: string;
    name: string;
    password?: string;
    mess_name: string;
  }): Promise<{
    order_id: string;
    email: string;
    roll_no: string;
    name: string;
    password: string | null;
    mess_name: string;
  }> => {
    await AsyncStorage.removeItem(PATH_TO_MESS_QR_LOCALSTORAGE);
    if (password) {
      await AsyncStorage.setItem(
        PATH_TO_MESS_QR_LOCALSTORAGE,
        JSON.stringify({
          order_id,
          email,
          password,
          name,
          roll_no,
          mess_name,
        })
      );
      return {
        order_id,
        email,
        password,
        name,
        roll_no,
        mess_name,
      };
    } else {
      await AsyncStorage.setItem(
        PATH_TO_MESS_QR_LOCALSTORAGE,
        JSON.stringify({
          order_id,
          email,
          password: null,
          name,
          roll_no,
          mess_name,
        })
      );
      return {
        order_id,
        email,
        password,
        name,
        roll_no,
        mess_name,
      };
    }
  }
);

export const removeMessQrStorage = createAsyncThunk(
  "mess_qr/removeStorage",
  async (): Promise<void> => {
    await AsyncStorage.removeItem(PATH_TO_MESS_QR_LOCALSTORAGE);
  }
);

const messQrSlice = createSlice({
  name: "mess_qr",
  initialState: messQrInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessQrStorage.pending, (state, _action) => {
      state.order_id = null;
      state.name = null;
      state.roll_no = null;
      state.email = null;
      state.mess_name = null;
      state.password = null;
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getMessQrStorage.fulfilled, (state, action) => {
      state.order_id = action.payload !== null ? action.payload.order_id : null;
      state.email = action.payload !== null ? action.payload.email : null;
      state.password = action.payload !== null ? action.payload.password : null;
      state.name = action.payload !== null ? action.payload.name : null;
      state.roll_no = action.payload !== null ? action.payload.roll_no : null;
      state.mess_name =
        action.payload !== null ? action.payload.mess_name : null;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getMessQrStorage.rejected, (state, _action) => {
      state.order_id = null;
      state.email = null;
      state.name = null;
      state.mess_name = null;
      state.roll_no = null;
      state.password = null;
      state.loading = false;
      state.error = "Error fetching mess qr from storage";
    });

    builder.addCase(setMessQrStorage.pending, (state, _action) => {
      state.order_id = null;
      state.email = null;
      state.name = null;
      state.roll_no = null;
      state.mess_name = null;
      state.password = null;
      state.loading = true;
      state.error = null;
    });

    builder.addCase(setMessQrStorage.fulfilled, (state, action) => {
      state.order_id = action.payload.order_id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
      state.roll_no = action.payload.roll_no;
      state.mess_name = action.payload.mess_name;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(setMessQrStorage.rejected, (state, _action) => {
      state.order_id = null;
      state.email = null;
      state.password = null;
      state.name = null;
      state.mess_name = null;
      state.roll_no = null;
      state.loading = false;
      state.error = "Error setting mess qr to storage";
    });

    builder.addCase(removeMessQrStorage.pending, (state, _action) => {
      state.order_id = null;
      state.email = null;
      state.password = null;
      state.name = null;
      state.mess_name = null;
      state.roll_no = null;
      state.loading = true;
      state.error = null;
    });

    builder.addCase(removeMessQrStorage.fulfilled, (state, _action) => {
      state.order_id = null;
      state.email = null;
      state.password = null;
      state.name = null;
      state.mess_name = null;
      state.roll_no = null;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(removeMessQrStorage.rejected, (state, _action) => {
      state.order_id = null;
      state.email = null;
      state.password = null;
      state.name = null;
      state.mess_name = null;
      state.roll_no = null;
      state.loading = false;
      state.error = "Error removing mess qr from storage";
    });
  },
});

const reducers = {
  messReducer: messSlice.reducer,
  messQrReducer: messQrSlice.reducer,
};

export default reducers;
