import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "./components/Item";
import LogoutButton from "./components/LogoutButton";
import SearchBar from "./components/SearchBar";
import itemService from "./services/items";
import userService from "./services/users";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { initLoggedInUser, logout } from "./reducers/loginReducer";
import { initItems } from "./reducers/itemsReducer";
import { initUsers } from "./reducers/usersReducer";

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const searchVal = useSelector((state) => state.searchVal);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      userService.setToken(user.token);
      dispatch(initLoggedInUser(user));
      console.log('user :>> ', user);
    } 

    itemService.getAll().then((res) => {
      dispatch(initItems(res));
    });
    userService.getAll().then((res) => {
      dispatch(initUsers(res));
    });
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
