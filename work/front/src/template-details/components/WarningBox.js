import React from "react";
import PropTypes from "prop-types";

const WarningBox = ({ message }) => {
  return (
    <div className="warning-box">
      <div className="icon">
        <img src="warning-icon.png" alt="warning icon" width="11" height="auto" />
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

WarningBox.propTypes = {
  message: PropTypes.string,
};

export default WarningBox;
