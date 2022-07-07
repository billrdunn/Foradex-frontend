import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: null,
  reducers: {
    updateSignUp: (state, action) => action.payload,
  },
});

export const signUpReducer = signUpSlice.reducer;

const signUpExceptionSlice = createSlice({
  name: "signUpException",
  initialState: null,
  reducers: {
    updateSignUpException: (state, action) => action.payload,
    setSignUpExceptionNull: () => null,
  },
});

export const signUpExceptionReducer = signUpExceptionSlice.reducer;

const { updateSignUp } = signUpSlice.actions;
const { updateSignUpException, setSignUpExceptionNull } = signUpExceptionSlice.actions;

export const createNewUser = (newUser) => async (dispatch) => {
  try {
    const user = await userService.create(newUser);
    dispatch(updateSignUp(user));
    dispatch(setSignUpExceptionNull());
  } catch (exception) {
    dispatch(updateSignUpException(exception.response.data.error));
  }
};
