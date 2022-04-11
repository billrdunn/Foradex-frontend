import { useEffect, useState } from "react";
import Item from "./components/Item";
import SearchBar from "./components/SearchBar";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchStr, setSearchStr] = useState(" ");

  useEffect(() => {
    axios
    .get("http://localhost:3001/api/items")
    .then(res => {
      setItems(res.data)
    })
  }, [])

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

  return (
    <div>
      <h1>Foradex</h1>
      {itemsToShow.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      <SearchBar onChange={handleSearchChange} />
    </div>
  );
};

export default App;
