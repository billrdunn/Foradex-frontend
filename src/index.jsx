import React from "react";
import { createRoot } from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import usersReducer from "./reducers/usersReducer";
import itemsReducer from "./reducers/itemsReducer";
import "./index.css";
import loginReducer from "./reducers/loginReducer";

const reducer = combineReducers({
  users: usersReducer,
  items: itemsReducer,
  login: loginReducer
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={createStore(reducer)}>
    <App tab="home" />
  </Provider>
);
