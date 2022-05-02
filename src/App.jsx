import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

  useEffect(() => {
    dispatch(initLoggedInUser());
    dispatch(initItems());
    dispatch(initUsers());
  }, [dispatch]);

  const padding = {
    padding: 5,
  };

  return (
    <Router>
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
        <Route path="/items/:id" element={<ItemDetailed items={items} />} />
        <Route path="/user" element={<LogoutButton />} />
      </Routes>
    </Router>
  );
}

export default App;
