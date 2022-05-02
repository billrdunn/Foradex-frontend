import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function ItemDetailed({ items }) {
  const { id } = useParams();

  const item = items.find((i) => i.id === String(id));

  ItemDetailed.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  };

  const itemStyle = {
    padding: "10px",
    borderBottom: "10px solid white",
    borderTop: "10px solid white",
  };

  return (
    <div className="item" style={itemStyle} id="itemDetailsDiv">
      <h2>{item.latin}</h2>
      <span>{item.common}</span>
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
    </div>
  );
}

export default ItemDetailed;
