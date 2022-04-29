import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    initItems: (state, action) => action.payload,
  },
});

export const { initItems } = itemsSlice.actions;
export default itemsSlice.reducer;
