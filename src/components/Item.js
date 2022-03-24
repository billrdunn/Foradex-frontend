const Item = ({ item }) => {
  return (
    <>
      <h2>{item.latin}</h2>
      {item.common[0]}
    </>
  );
};

export default Item;
