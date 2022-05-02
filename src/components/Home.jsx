import React from "react";
import { useSelector } from "react-redux";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";

function Home() {
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const loginForm = () => (
    <Togglable buttonLabel="show login">
      <LoginForm />
    </Togglable>
  );

  return (
    <div>
      <h1>Foradex</h1>
      {loggedInUser === null ? loginForm() : <h2>{loggedInUser.name} logged in</h2>}
    </div>
  );
}

export default Home;
