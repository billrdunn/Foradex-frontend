import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../reducers/usersReducer";

function ItemBasic({ item, found }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser);

  ItemBasic.propTypes = {
    item: PropTypes.shape({
      latin: PropTypes.string.isRequired,
      common: PropTypes.arrayOf(PropTypes.string).isRequired,
      description: PropTypes.shape({
        cap: PropTypes.string.isRequired,
        gills: PropTypes.string.isRequired,
        stem: PropTypes.string.isRequired,
        flesh: PropTypes.string.isRequired,
        spores: PropTypes.string.isRequired,
      }),
      habitat: PropTypes.string.isRequired,
      flavour: PropTypes.string.isRequired,
      frequency: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      image_gs: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    found: PropTypes.bool.isRequired,
  };

  const handleToggleFound = () => {
    let newItems;
    if (found) {
      newItems = user.items.filter((i) => i !== item.id);
    } else {
      newItems = [...user.items, item.id];
    }
    const newUser = {
      ...user,
      items: newItems,
    };
    dispatch(updateUser(user.id, newUser));
  };

  return (
    <Card bg="success" style={{ width: "18rem" }}>
      {found ? <Card.Img variant="top" src={item.image} /> : <Card.Img variant="top" src={item.image_gs} />} 
      <Card.Body>
        <Card.Text>
          <Link to={`/items/${item.id}`}>{item.latin}</Link>
        </Card.Text>
        <ListGroup variant="flush">
            <ListGroup.Item>{item.common[0]}</ListGroup.Item>
        </ListGroup>
        <Button onClick={handleToggleFound}>toggle found</Button>
      </Card.Body>
    </Card>
  );
}

export default ItemBasic;
