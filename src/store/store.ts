// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './slices/albumsSlice';  // Assuming this is in your slices folder
import imageReducer from './slices/imagesSlice';  // Assuming this is in your slices folder
import toastReducer from './slices/toastSlice';  // Assuming this is in your slices folder

export const store = configureStore({
  reducer: {
    album: albumReducer,
    images: imageReducer,
    toast: toastReducer,  // Including the Toast reducer here
  },
});

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
