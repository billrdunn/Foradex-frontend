const Item = ({ item }) => {
  return (
    <li className="item">
      <h2>{item.latin}</h2>
      {item.common[0]}
    </li>
  );
};

export default Item;
