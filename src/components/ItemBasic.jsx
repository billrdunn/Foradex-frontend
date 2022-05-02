import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedInUser } from "../reducers/loginReducer";

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
      id: PropTypes.string.isRequired,
    }).isRequired,
    found: PropTypes.bool.isRequired,
  };

  const itemStyle = {
    background: found ? "lightgreen" : "red",
    padding: "10px",
    borderBottom: "10px solid white",
    borderTop: "10px solid white",
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
    dispatch(updateLoggedInUser(user.id, newUser));
  };

  return (
    <div className="item" style={itemStyle} id="itemBasicDiv">
      <h2>
        <Link to={`/items/${item.id}`}>{item.latin}</Link>
      </h2>
      {item.common[0]}
      <p />
      <button type="submit" onClick={handleToggleFound}>
        toggle found
      </button>
      <br />
    </div>
  );
}

export default ItemBasic;
