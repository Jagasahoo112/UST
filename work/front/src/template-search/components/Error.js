import React from "react";
import PropTypes from "prop-types";

const Error = ({ title }) => {
  return (
    <section className="error">
      <h4 className="title">{title}</h4>
    </section>
  );
};

Error.propTypes = {
  title: PropTypes.string,
};

export default Error;
