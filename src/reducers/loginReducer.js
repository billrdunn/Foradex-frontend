import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import loginService from "../services/login";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    update: (state, action) => action.payload,
    setNull: () => null,
  },
});

const { update, setNull } = loginSlice.actions;

export const initLoggedInUser = () => async (dispatch) => {
  const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
  if (loggedInUserJSON) {
    const user = JSON.parse(loggedInUserJSON);
    // Need to update the user in case the user has changed since the last time they logged in
    const newUser = await loginService.update(user);
    userService.setToken(newUser.token);
    dispatch(update(newUser));
  }
};

export const updateLoggedInUser = (updatedUser) => async (dispatch) => {
  dispatch(update(updatedUser));
};

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await loginService.login({ username, password });

    window.localStorage.setItem("loggedInUser", JSON.stringify(response));
    userService.setToken(response.token);
    dispatch(update(response));
  } catch (exception) {
    console.log("exception :>> ", exception);
  }
};

export const logout = () => async (dispatch) => {
  window.localStorage.removeItem("loggedInUser");
  dispatch(setNull());
};

export default loginSlice.reducer;
