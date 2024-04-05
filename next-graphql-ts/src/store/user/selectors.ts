import { createSelector } from "reselect";
import { AppState } from "../index";

export const userState = (state: AppState) => state.user;

export const getUser = createSelector(userState, (store) => {
  return store.user;
});
