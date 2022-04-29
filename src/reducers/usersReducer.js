import { createSlice } from "@reduxjs/toolkit";

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
export default usersSlice.reducer;
