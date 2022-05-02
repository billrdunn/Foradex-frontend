import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import ItemBasic from "./ItemBasic";

function ItemList() {
  const searchVal = useSelector((state) => state.searchVal);
  const items = useSelector((state) => state.items);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const itemsToShow =
    searchVal.length === 0
      ? items
      : items.filter(
          (item) =>
            item.latin.toLowerCase().includes(searchVal) ||
            item.common[0].toLowerCase().includes(searchVal)
        );

  return (
    <div>
      <h1>Items</h1>
      <SearchBar />
      {itemsToShow.map((item) => (
        <ItemBasic key={item.id} item={item} found={loggedInUser.items.includes(item.id)} />
      ))}
    </div>
  );
}

export default ItemList;
