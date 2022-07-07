import React from "react";
import { useSelector } from "react-redux";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Home() {
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const loginForm = () => (
    <div>
      <Togglable buttonLabel="show login">
        <LoginForm />
        <br />
      </Togglable>
      <br />
    </div>
  );

  const signUpForm = () => (
    <Togglable buttonLabel="sign up">
      <SignUpForm />
      <br />
    </Togglable>
  );

  return (
    <div>
      <h1>Foradex</h1>
      {loggedInUser === null ? loginForm() : <h2>{loggedInUser.name} logged in</h2>}
      {!loggedInUser && signUpForm()}
    </div>
  );
}

export default Home;
