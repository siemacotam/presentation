import { configureStore } from "@reduxjs/toolkit";
import slides from "./reducers/slidesReducer/slidesReducer";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    slides,
  },
});
