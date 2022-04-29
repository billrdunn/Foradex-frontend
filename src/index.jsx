import React from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import usersReducer from "./reducers/usersReducer";
import itemsReducer from "./reducers/itemsReducer";
import "./index.css";
import loginReducer from "./reducers/loginReducer";
import searchValReducer from "./reducers/searchValReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    items: itemsReducer,
    loggedInUser: loginReducer,
    searchVal: searchValReducer,
  },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
