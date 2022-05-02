import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Link, useMatch } from "react-router-dom";
import LogoutButton from "./components/LogoutButton";
import { initLoggedInUser } from "./reducers/loginReducer";
import { initItems } from "./reducers/itemsReducer";
import { initUsers } from "./reducers/usersReducer";
import ItemList from "./components/ItemList";
import Home from "./components/Home";
import ItemDetailed from "./components/ItemDetailed";

function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const items = useSelector((state) => state.items);

  // If the url matches "/items/:id", we can use the match variable to find the item
  const match = useMatch("/items/:id");
  const item = match ? items.find((i) => i.id === match.params.id) : null;

  useEffect(() => {
    dispatch(initLoggedInUser());
    dispatch(initItems());
    dispatch(initUsers());
  }, [dispatch]);

  const padding = {
    padding: 5,
  };

  return (
    <>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        {loggedInUser && (
          <Link style={padding} to="/items">
            items
          </Link>
        )}
        {loggedInUser && (
          <Link style={padding} to="/user">
            user
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/:id" element={item && <ItemDetailed item={item} />} />
        <Route path="/user" element={<LogoutButton />} />
      </Routes>
    </>
  );
}

export default App;
