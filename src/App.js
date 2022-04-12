import { useEffect, useState } from "react";
import Item from "./components/Item";
import SearchBar from "./components/SearchBar";
import itemService from "./services/items";

const App = () => {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchStr, setSearchStr] = useState(" ");

  useEffect(() => {
    itemService
      .getAll()
      .then(res => {
        setItems(res)
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
