import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// import albumReducer from "./albumSlice";
// import mediaReducer from "./mediaSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // album: albumReducer,
    // media: mediaReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
