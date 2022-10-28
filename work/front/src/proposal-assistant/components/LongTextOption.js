import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames"
import { Link } from "@fluentui/react";
import nl2br from "../helpers/newLinetoBreak";

const LongTextOption = ({ text, onClick }) => {
    const [showAllText, setShowAllText] = useState(false)

    function toggleViewMore(event) {
        event.stopPropagation()
        setShowAllText(!showAllText)
    }

    return (
        <div className="long-text-option" onClick={onClick} role="button">
            <div className="long-text-option-content">
                <div className={classNames('long-text-option-text', { collapsed: !showAllText })}>
                    {nl2br(text)}
                </div>
                
                <Link className="view-more-button" onClick={(event) => toggleViewMore(event)}>
                    {showAllText ? 'View Less' : 'View More'}
                </Link>
            </div>
        </div>
    )
}

LongTextOption.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default LongTextOption;
