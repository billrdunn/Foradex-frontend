import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import useField from "../hooks/index";

function LoginForm() {
  const dispatch = useDispatch();

  const usernameField = useField("text", "loginInputUsername", "username");
  const passwordField = useField("password", "loginInputPassword", "password");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(usernameField.value, passwordField.value));
  };

  return (
    <div className="loginFormDiv">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            id={usernameField.id}
            type={usernameField.type}
            value={usernameField.value}
            onChange={usernameField.onChange}
            placeholder={usernameField.placeholder}
          />
        </div>
        <div>
          <input
            id={passwordField.id}
            type={passwordField.type}
            value={passwordField.value}
            onChange={passwordField.onChange}
            placeholder={passwordField.placeholder}
          />
        </div>
        <button className="loginButton" id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
