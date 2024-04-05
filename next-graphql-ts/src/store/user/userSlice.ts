import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";
// TYPES
import { UserState } from "./types";
import { GetCurrentUserQuery, LogInMutation, Member, Store } from "@/graphql/generated/schema";
// CONSTANTS
import { userConstants } from "./constants";

const initialState: UserState = {
  isLogged: false,
  user: null,
  selectedMember: null,
  selectedMemberStore: null,
};

export const userSlice = createSlice({
  name: userConstants.SLICE_NAME,
  initialState,
  reducers: {
    userLogIn(state, action: PayloadAction<LogInMutation>) {
      state.user = action.payload.logIn?.user;
      state.isLogged = true;

      setCookie(userConstants.ACCESS_TOKEN, action.payload.logIn?.access_token);
      setCookie(userConstants.REFRESH_TOKEN, action.payload.logIn?.refresh_token);
    },
    userLogOut(state) {
      state.isLogged = false;
      state.user = null;
      deleteCookie(userConstants.ACCESS_TOKEN);
      deleteCookie(userConstants.REFRESH_TOKEN);
    },
    setCurrentUser(state, action: PayloadAction<GetCurrentUserQuery>) {
      state.user = action.payload.currentUser;
      state.isLogged = true;
    },
  },
});

export const {
  userLogIn,
  userLogOut,
  setCurrentUser,
  setselectedMember,
  setselectedMemberStore,
} = userSlice.actions;

export default userSlice.reducer;
