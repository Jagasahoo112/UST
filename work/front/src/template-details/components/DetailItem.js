import React from "react";
import PropTypes from "prop-types";

const DetailItem = ({ label, value, valueSibling }) => {
  return (
    <div className="detail-item">
      <div className="label">{`${label}:`}</div>
      <div className="value-and-sibling">
        <span>{value}</span>
        <div className="value-sibling">{valueSibling}</div>
      </div>
    </div>
  );
};

DetailItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  valueSibling: PropTypes.node,
};

export default DetailItem;
