import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import loginService from "../services/login";
import userService from "../services/users";

function LoginForm() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login({ username, password });

      window.localStorage.setItem("loggedInUser", JSON.stringify(response));
      userService.setToken(response.token);
      dispatch(login(response));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("exception :>> ", exception);
    }
  };

  return (
    <div className="loginFormDiv">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="loginInputUsername"
            id="loginInputUsername"
            placeholder="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            className="loginInputPassword"
            id="loginInputPassword"
            placeholder="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
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
