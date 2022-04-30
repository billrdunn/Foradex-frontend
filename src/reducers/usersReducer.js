import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initUsers: (state, action) => action.payload,
    updateUser: (state, action) => {
      state.filter((user) => user.id !== action.payload.id).push(action.payload);
      return state;
    },
  },
});

export const { initUsers, updateUser } = usersSlice.actions;

export const initialiseUsers = () => {
  console.log("in initialiseUsers");
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(initUsers(users));
  };
};

export default usersSlice.reducer;
