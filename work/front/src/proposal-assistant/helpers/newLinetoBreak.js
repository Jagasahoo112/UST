import React from 'react';

function nl2br (text) {
    return text.split('\n').map(function(item, key) {
        return (
        <span key={key}>
            {item}
            <br/>
        </span>
        )
    })
}

export default nl2br