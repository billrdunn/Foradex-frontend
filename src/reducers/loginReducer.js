import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import loginService from "../services/login";
import { editUser } from "./usersReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    update: (state, action) => action.payload,
    setNull: () => null,
  },
});

const { update, setNull } = loginSlice.actions;

export const initLoggedInUser = () => {
  console.log("in initialiseLoggedInUser");
  return async (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      userService.setToken(user.token);
      dispatch(update(user));
    }
  };
};

export const updateLoggedInUser = (id, newUser) => {
  console.log("in updateLoggedInUser");
  return async (dispatch) => {
    const response = await userService.update(id, newUser);
    dispatch(update(response));
    dispatch(editUser(response));
  };
};

export const login = (username, password) => {
  console.log("in login");
  return async (dispatch) => {
    try {
      const response = await loginService.login({ username, password });

      window.localStorage.setItem("loggedInUser", JSON.stringify(response));
      userService.setToken(response.token);
      dispatch(update(response));
    } catch (exception) {
      console.log("exception :>> ", exception);
    }
  };
};

export const logout = () => {
  console.log("in logout");
  return async (dispatch) => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(setNull());
  };
};

export default loginSlice.reducer;
