import usersService from "../services/users";

const usersReducer = (state = [], action = {}) => {
  switch (action.type) {
    case "TOGGLE_FOUND":
      return state.concat(action.data);
    default:
      return state;
  }
};

export const toggleFound = async (user, item) => {
  if (user.items.includes(item.id)) {
    const newItems = user.items.filter((i) => i !== item.id);
    const newUser = {
      ...user,
      items: newItems,
    };
    await usersService.update(user.id, newUser);
    return {
      type: "REMOVE_ITEM",
      user,
    };
  }

  const newItems = [...user.items, item.id];
  const newUser = {
    ...user,
    items: newItems,
  };

  await usersService.update(user.id, newUser);
  return {
    type: "ADD_ITEM",
    user,
  };
};

export default usersReducer;
