import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./reducers/usersReducer";
import itemsReducer from "./reducers/itemsReducer";
import { loginReducer, loginExceptionReducer } from "./reducers/loginReducer";
import searchValReducer from "./reducers/searchValReducer";
import { signUpStatusReducer } from "./reducers/signUpReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    items: itemsReducer,
    loggedInUser: loginReducer,
    searchVal: searchValReducer,
    loginException: loginExceptionReducer,
    signUpStatus: signUpStatusReducer,
  },
});

export default store;
