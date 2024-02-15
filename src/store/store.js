import { configureStore } from "@reduxjs/toolkit";
import usersSliceReducer from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersSliceReducer,
  },
});
