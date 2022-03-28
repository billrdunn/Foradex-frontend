import { useState, useEffect } from "react";
import axios from 'axios'
import Item from "./components/Item";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchStr, setSearchStr] = useState(" ");

  // The effect is executed immediately after rendering the component
  useEffect(() => {
    // axios.get(...) returns a promise
    axios.get("https://localhost:3001/items")
      .then(res => {
        // Executed when the promise is fulfilled
        
        setItems(res.data);
      })
      .catch(err => {
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
