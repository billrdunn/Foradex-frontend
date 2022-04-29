import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    initLoggedInUser: (state, action) => action.payload,
    login: (state, action) => action.payload,
    updateLoggedInUser: (state, action) => action.payload,
    logout: () => null,
  },
});

export const { initLoggedInUser, login, updateLoggedInUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
