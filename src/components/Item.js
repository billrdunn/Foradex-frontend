const Item = ({ item, found }) => {
  return (
    <li className="item">
      <h2>{item.latin}</h2>
      {item.common[0]}
      <p></p>
      {found && <span>found!</span>}
    </li>
  );
};

export default Item;
