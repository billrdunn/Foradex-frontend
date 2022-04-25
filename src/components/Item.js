import { useState } from "react";

const Item = ({ item, found, handleToggleFound }) => {
  const [showDetails, setShowDetails] = useState(false);

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
      <div style={itemStyle}>
        <h2>{item.latin}</h2>
        <p>{item.common}</p>
        <p>Cap: {item.description.cap}</p>
        <p>Gills: {item.description.gills}</p>
        <p>Stem: {item.description.stem}</p>
        <p>Flesh: {item.description.flesh}</p>
        <p>Spores: {item.description.spores}</p>
        <p>Habitat: {item.habitat}</p>
        <p>Habitat: {item.flavour}</p>
        <p>Frequency: {item.frequency}</p>
        <img src={item.image} alt="Amethyst deceiver pic" height={200} />
        <p></p>
        <button onClick={handleShowDetails}>hide details</button>
      </div>
    );
  } else {
    return (
      <div style={itemStyle}>
        <h2>{item.latin}</h2>
        {item.common[0]}
        <p></p>
        <button onClick={() => handleToggleFound(item)}>toggle found</button>
        <br></br>
        <button onClick={() => handleShowDetails()}>view details</button>
      </div>
    );
  }
};

export default Item;
