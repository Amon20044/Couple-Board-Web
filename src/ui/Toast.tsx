// components/Toast.tsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { hideToast } from "../store/slices/toastSlice";
import clsx from "clsx";

const Toast = () => {
  const dispatch = useDispatch();
  const { visible, message, type } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 5000); // ⏰ 5 seconds
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "fixed top-5 right-5 z-50 px-4 py-2 rounded-md shadow-lg text-white transition-all",
        {
          "bg-green-600": type === "success",
          "bg-red-600": type === "error",
          "bg-blue-600": type === "info",
        }
      )}
    >
      {message}
    </div>
  );
};

export default Toast;
