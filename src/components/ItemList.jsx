import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import SearchBar from "./SearchBar";
import ItemCard from "./ItemCard";

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
      <Row xs={1} md={2} xl={3} className="g-4">
        {itemsToShow.map((item) => (
          <Col>
            <ItemCard key={item.id} item={item} found={loggedInUser.items.includes(item.id)} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ItemList;
