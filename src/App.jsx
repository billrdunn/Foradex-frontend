import React, { useEffect, useState } from "react";
import Item from "./components/Item";
import LogoutButton from "./components/LogoutButton";
import SearchBar from "./components/SearchBar";
import itemService from "./services/items";
import loginService from "./services/login";
import userService from "./services/users";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

function App() {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchStr, setSearchStr] = useState(" ");
  const [user, setUser] = useState(null);

  useEffect(() => {
    itemService.getAll().then((res) => {
      setItems(res);
    });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser(loggedInUser);
      userService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    const { username } = userObject;
    const { password } = userObject;
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      userService.setToken(loggedInUser.token);
      setUser(loggedInUser);
    } catch (exception) {
      alert("Invalid credentials", exception);
    }
  };

  const itemsToShow = showAll
    ? items
    : items.filter(
        (item) =>
          item.latin.toLowerCase().includes(searchStr) ||
          item.common[0].toLowerCase().includes(searchStr)
      );

  const handleSearchChange = (event) => {
    setShowAll(false);
    setSearchStr(event.target.value.toLowerCase());
  };

  const loginForm = () => (
    <Togglable buttonLabel="show login">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  );

  const handleToggleFound = async (item) => {
    if (user.items.includes(item.id)) {
      const newItems = user.items.filter((i) => i !== item.id);
      const newUser = {
        ...user,
        items: newItems,
      };
      await userService.update(user.id, newUser);
      setUser(newUser);
    } else {
      const newItems = [...user.items, item.id];

      const newUser = {
        ...user,
        items: newItems,
      };

      await userService.update(user.id, newUser);
      setUser(newUser);
    }
  };

  const handleViewDetails = (item) => {
    console.log("item :>> ", item);
  };

  const itemList = () => (
    <div>
      <h1>Items</h1>
      <SearchBar searchStr={searchStr} onChange={handleSearchChange} />
      {itemsToShow.map((item) => (
        <Item
          key={item.id}
          item={item}
          found={user.items.includes(item.id)}
          handleToggleFound={handleToggleFound}
          handleViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div>
      <h1>Foradex</h1>
      {user === null ? loginForm() : <h2>{user.name} logged in</h2>}
      {user !== null && <LogoutButton onClick={() => handleLogout()} />}
      {user !== null && itemList()}
    </div>
  );
}

export default App;
