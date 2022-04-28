import React, { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {

    // dispatch(login(username, password));

    setUsername("");
    setPassword("");
  };

  return (
    <div className="loginFormDiv">
      <h2>Login</h2>

      <form onSubmit={() => handleSubmit()}>
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
