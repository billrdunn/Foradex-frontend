import { useState, useEffect } from "react";
import itemService from './services/items';
import Item from "./components/Item";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchStr, setSearchStr] = useState(" ");

  // The effect is executed immediately after rendering the component
  useEffect(() => {
    itemService.getAll()
      .then(initialItems => {
        // Executed when the promise is fulfilled
        setItems(initialItems);
      })
      .catch(err => {
        // Catch any erros in the promise chain
        // causing a promise to be rejected
        console.log(err);
      }
    );
  }, [])
  // By default, effects are run after every completed render
  // but the [] array is empty, so the effect is only run once

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
