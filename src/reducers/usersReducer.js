import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    update: (state, action) => action.payload,
    edit: (state, action) => {
      state.filter((user) => user.id !== action.payload.id).push(action.payload);
    },
  },
});

const { update, edit } = usersSlice.actions;

export const initUsers = () => {
  console.log("in initialiseUsers");
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(update(users));
  };
};

export const editUser = (id, newUser) => {
  console.log("in updateUser");
  return async (dispatch) => {
    const response = await userService.update(id, newUser);
    dispatch(edit(response));
  };
};

export default usersSlice.reducer;
