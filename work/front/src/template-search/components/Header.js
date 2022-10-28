import React from "react";
import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <section className="header">
      <h3 className="title">{title}</h3>
    </section>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
