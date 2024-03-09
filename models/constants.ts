// client ids for oauth sign in
export const androidClientId: string =
  process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_ANDROID_CLIENT_ID;

// paths to local storage
export const PATH_TO_USER_LOCAL_STORAGE: string =
  process.env.EXPO_PUBLIC_PATH_TO_USER_LOCAL_STORAGE;
export const PATH_TO_MESS_LOCAL_STORAGE: string =
  process.env.EXPO_PUBLIC_PATH_TO_MESS_LOCAL_STORAGE;
export const PATH_TO_MESS_QR_LOCALSTORAGE: string =
  process.env.EXPO_PUBLIC_PATH_TO_MESS_QR_LOCALSTORAGE;
export const PATH_TO_OUTLET_LOCAL_STORAGE: string = "@insiit/outlet";

// api related
// export const API_BASE_URL: string = process.env.EXPO_PUBLIC_API_BASE_URL;
// export const API_BASE_URL = "https://insiit-api.onrender.com";
// export const API_BASE_URL = "http://10.240.5.69:8000";
// export const API_BASE_URL = "http://10.7.22.219:8000";
// export const API_BASE_URL = "http://192.168.0.1:8000";
export const API_BASE_URL = "http://10.7.43.186:8000";
