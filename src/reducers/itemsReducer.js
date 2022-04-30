import { createSlice } from "@reduxjs/toolkit";
import itemService from "../services/items";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    initItems: (state, action) => action.payload,
  },
});

export const { initItems } = itemsSlice.actions;

export const initialiseItems = () => {
  console.log("in initialiseItems");
  return async (dispatch) => {
    const items = await itemService.getAll();
    dispatch(initItems(items));
  };
};

export default itemsSlice.reducer;
