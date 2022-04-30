import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

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

export const initialiseLoggedInUser = () => {
  console.log("in initialiseLoggedInUser");
  return async (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      userService.setToken(user.token);
      dispatch(initLoggedInUser(user));
    } 
  };
};

export default loginSlice.reducer;
