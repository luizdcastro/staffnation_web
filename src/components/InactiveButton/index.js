import React from 'react';

import './styles.css';

const InactiveButton = ({ name, ...otherProps }) => {

    return (
        <React.Fragment>
            <button
                className="inactive-button"
                {...otherProps}
            >
                {name}
            </button>
        </React.Fragment>
    );
};

export default InactiveButton;