import React from "react";
import PropTypes from "prop-types";
import { Link } from "@fluentui/react";

const DownloadLink = ({ href }) => {
  return (
    <Link className="download-link" href={href} download>
      Download Template
    </Link>
  );
};

DownloadLink.propTypes = {
  href: PropTypes.string,
};

export default DownloadLink;
