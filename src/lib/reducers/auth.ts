import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/lib/types/api";

export type AuthState = {
  user: {
    email?: string;
    token?: string;
    username?: string;
    bio?: string;
    image?: string;
  };
  loggedIn: boolean;
};

const getInitialState = () => {
  const storageData = localStorage.getItem("auth");
  const auth: AuthState | undefined = storageData ? JSON.parse(storageData) : undefined;

  const defaultState: AuthState = {
    user: {},
    loggedIn: false,
  };

  return auth ? auth : defaultState;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loggedIn = true;

      localStorage.setItem("auth", JSON.stringify(state));
    },

    logout: state => {
      state.user = {};
      state.loggedIn = false;

      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
