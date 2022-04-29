import React from "react";
import { createRoot } from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import usersReducer from "./reducers/usersReducer";
import itemsReducer from "./reducers/itemsReducer";
import "./index.css";
import loginReducer from "./reducers/loginReducer";
import searchValReducer from "./reducers/searchValReducer";

const reducer = combineReducers({
  users: usersReducer,
  items: itemsReducer,
  login: loginReducer,
  searchVal: searchValReducer,
});

const store = createStore(reducer);
// store.dispatch(setSearchVal("test search"));

// store.subscribe(() => {
//   console.log(store.getState());
// });

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
