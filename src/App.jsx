import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "./components/Item";
import LogoutButton from "./components/LogoutButton";
import SearchBar from "./components/SearchBar";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { initialiseLoggedInUser, logout } from "./reducers/loginReducer";
import { initialiseItems } from "./reducers/itemsReducer";
import { initialiseUsers } from "./reducers/usersReducer";

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const searchVal = useSelector((state) => state.searchVal);

  useEffect(() => {
    dispatch(initialiseLoggedInUser());
    dispatch(initialiseItems());
    dispatch(initialiseUsers());
  }, [dispatch]);

  const itemsToShow =
    searchVal.length === 0
      ? items
      : items.filter(
          (item) =>
            item.latin.toLowerCase().includes(searchVal) ||
            item.common[0].toLowerCase().includes(searchVal)
        );

  const loginForm = () => (
    <Togglable buttonLabel="show login">
      <LoginForm />
    </Togglable>
  );

  const itemList = () => (
    <div>
      <h1>Items</h1>
      <SearchBar />
      {itemsToShow.map((item) => (
        <Item key={item.id} item={item} found={loggedInUser.items.includes(item.id)} />
      ))}
    </div>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(logout());
  };

  return (
    <div>
      <h1>Foradex</h1>
      {loggedInUser === null ? loginForm() : <h2>{loggedInUser.name} logged in</h2>}
      {loggedInUser !== null && <LogoutButton onClick={() => handleLogout()} />}
      {loggedInUser !== null && itemList()}
    </div>
  );
}

export default App;
