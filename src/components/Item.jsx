import React, { useState } from "react";
import PropTypes from "prop-types";

function Item({ item, found, handleToggleFound }) {
  const [showDetails, setShowDetails] = useState(false);

  Item.propTypes = {
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
    }).isRequired,
    found: PropTypes.bool.isRequired,
    handleToggleFound: PropTypes.func.isRequired,
  };

  const itemStyle = {
    background: found ? "lightgreen" : "red",
    padding: "10px",
    borderBottom: "10px solid white",
    borderTop: "10px solid white",
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  if (showDetails) {
    return (
      <div className="item" style={itemStyle} id="itemDetailsDiv">
        <h2>{item.latin}</h2>
        <p>{item.common}</p>
        <p>Cap: {item.description.cap}</p>
        <p>Gills: {item.description.gills}</p>
        <p>Stem: {item.description.stem}</p>
        <p>Flesh: {item.description.flesh}</p>
        <p>Spores: {item.description.spores}</p>
        <p>Habitat: {item.habitat}</p>
        <p>Flavour: {item.flavour}</p>
        <p>Frequency: {item.frequency}</p>
        <img src={item.image} alt="Amethyst deceiver pic" height={200} />
        <p />
        <button type="submit" onClick={handleShowDetails}>
          hide details
        </button>
      </div>
    );
  }
  return (
    <div style={itemStyle} id="itemBasicDiv">
      <h2>{item.latin}</h2>
      {item.common[0]}
      <p />
      <button type="submit" onClick={() => handleToggleFound(item)}>
        toggle found
      </button>
      <br />
      <button type="submit" onClick={() => handleShowDetails()}>
        view details
      </button>
    </div>
  );
}

export default Item;
