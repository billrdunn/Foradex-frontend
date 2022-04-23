import { useEffect, useState } from "react";
import Item from "./components/Item";
import SearchBar from "./components/SearchBar";
import itemService from "./services/items";
import loginService from "./services/login";

const App = () => {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchStr, setSearchStr] = useState(" ");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    itemService.getAll().then((res) => {
      setItems(res);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      itemService.setToken(user.token);
      setUser(user);
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
    console.log("event.target.value :>> ", event.target.value);
    setShowAll(false);
    setSearchStr(event.target.value.toLowerCase());
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div>
      <h1>Foradex</h1>
      {user === null ? loginForm() : <h2>{user.name} logged in</h2>}
      {itemsToShow.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      <SearchBar onChange={handleSearchChange} />
    </div>
  );
};

export default App;
