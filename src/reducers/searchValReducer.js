const searchValReducer = (state = "", action = {}) => {
  switch (action.type) {
    case "SET_SEARCH_VAL":
      return action.searchVal;
    default:
      return state;
  }
};

export const setSearchVal = (searchVal) => ({
  type: "SET_SEARCH_VAL",
  searchVal,
});

export default searchValReducer;
