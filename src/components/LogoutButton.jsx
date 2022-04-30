import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/loginReducer";

function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button type="submit" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
