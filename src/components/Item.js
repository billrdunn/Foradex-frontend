const Item = ({ item, found, handleToggleFound }) => {
  return (
    <li className="item">
      <h2>{item.latin}</h2>
      {item.common[0]}
      <p></p>
      {found && <span>found!</span>}
      <p></p>
      <button onClick={() => handleToggleFound(item)}>toggle found</button>
    </li>
  );
};

export default Item;
