import React from 'react';
import classNames from 'classnames';
import { Spinner, SpinnerSize } from '@fluentui/react';

const ResultsMessage = ({ text, icon, spinner }) => {
    return (
        <div className="results-message">
            {icon && <img src={icon}/>}
            {spinner && <Spinner size={SpinnerSize.large} />}
            <div className={classNames('message-text', { centered: icon || spinner })}>
                {text}
            </div>
        </div>
    )
}

export default ResultsMessage;