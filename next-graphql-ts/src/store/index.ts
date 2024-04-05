import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { userSlice } from "./user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
