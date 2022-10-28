import React from 'react';

const SearchResult = ({ item, href }) => {
    console.log(href)
    return (
        <a className="search-result" href={href} download>
            <div className="name">
                {item["Name"]}
            </div>
            <div className="date-and-author">
                <div className="created-at">
                    {'Created: ' + item["Created on"]}
                </div>
                <div className="author">
                    {'Created by: ' + item["Created by"]}
                </div>
            </div>
        </a>
    )
}

export default SearchResult;