import React from "react";
import PropTypes from "prop-types";

function SearchBar({ onChange }) {
  SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  return (
    <div>
      Search:
      <form>
        <input id="searchBarInput" onChange={onChange} />
      </form>
    </div>
  );
}

export default SearchBar;
