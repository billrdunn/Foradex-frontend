import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from "./components/LogoutButton";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { initLoggedInUser } from "./reducers/loginReducer";
import { initItems } from "./reducers/itemsReducer";
import { initUsers } from "./reducers/usersReducer";
import ItemList from "./components/ItemList";

function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    dispatch(initLoggedInUser());
    dispatch(initItems());
    dispatch(initUsers());
  }, [dispatch]);


  const loginForm = () => (
    <Togglable buttonLabel="show login">
      <LoginForm />
    </Togglable>
  );


  return (
    <div>
      <h1>Foradex</h1>
      {loggedInUser === null ? loginForm() : <h2>{loggedInUser.name} logged in</h2>}
      {loggedInUser !== null && <LogoutButton />}
      {loggedInUser !== null && <ItemList />}
    </div>
  );
}

export default App;
