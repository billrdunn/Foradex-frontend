import PropTypes from "prop-types";
import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
