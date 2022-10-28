import React, { useState } from "react";
import PropTypes from "prop-types";
import nl2br from "../helpers/newLinetoBreak";

const ShortTextOption = ({ text, onClick }) => {
    return (
        <button className="short-text-option" onClick={onClick}>
            {nl2br(text)}
        </button>
    )
}

ShortTextOption.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default ShortTextOption;
