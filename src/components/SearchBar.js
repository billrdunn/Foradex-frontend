const SearchBar = ({ onChange }) => {
  return (
    <div>
      Search:
      <form>
        <input onChange={onChange} />
      </form>
    </div>
  );
};

export default SearchBar;
