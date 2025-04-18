// store/slices/toastSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface ToastState {
  message: string;
  type: "success" | "error" | "info" | null;
  visible: boolean;
  duration: number;  // Add duration to control how long the toast should be visible
}

const initialState: ToastState = {
  message: "",
  type: "info", // Default type
  visible: false,
  duration: 5000, // Default duration of 5 seconds
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type: "success" | "error" | "info"; duration?: number }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
      state.duration = action.payload.duration || 5000; // Default to 5 seconds if no duration is passed
    },
    hideToast: (state) => {
      state.visible = false;
      state.message = "";
      state.type = null;
      state.duration = 5000; // Reset duration
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export const selectToastType = (state: RootState) => state.toast.type;
export const selectToastMessage = (state: RootState) => state.toast.message;
export const selectToastDuration = (state: RootState) => state.toast.duration;  // Selector for duration
export default toastSlice.reducer;
