import React from "react";
import PropTypes from "prop-types";

function LogoutButton({ onClick }) {
  LogoutButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  return (
    <button type="submit" onClick={onClick}>
      Logout
    </button>
  );
}

export default LogoutButton;
