import { useEffect, useState } from "react";
import Item from "./components/Item";
import LogoutButton from "./components/LogoutButton";
import SearchBar from "./components/SearchBar";
import itemService from "./services/items";
import loginService from "./services/login";
import userService from "./services/users";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchStr, setSearchStr] = useState(" ");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    itemService.getAll().then((res) => {
      setItems(res);
    });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      userService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      userService.setToken(loggedInUser.token);
      setUser(loggedInUser);
      setUsername("");
      setPassword("");
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

  const loginForm = () => {
    const hideWhenLoginVisible = { display: loginVisible ? "none" : "" };
    const showWhenLoginVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenLoginVisible}>
          <button onClick={() => setLoginVisible(true)}>show login</button>
        </div>
        <div style={showWhenLoginVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

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

  const itemList = () => {
    return (
      <div>
        <h1>Items</h1>
        <SearchBar searchStr={searchStr} onChange={handleSearchChange} />
        <ul>
          {itemsToShow.map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                found={user.items.includes(item.id)}
                handleToggleFound={handleToggleFound}
              />
            );
          })}
        </ul>
      </div>
    );
  };

  const handleLogout = () => {
    console.log("handle logout");
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
};

export default App;
