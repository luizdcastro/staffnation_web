import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import './styles.css';

const LightButton = ({ name, ...otherProps }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoading = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <React.Fragment>
            {!isLoading ? (
                <Link
                    className="light-button"
                    {...otherProps}
                    onClick={handleLoading}
                >
                    {name}
                </Link>
            ) : (
                    <Link className="light-button" {...otherProps}>
                        <div className="loading-dots-light">
                            <div className="bounce"></div>
                            <div className="bounce1"></div>
                            <div className="bounce3"></div>
                        </div>
                    </Link>
                )}
        </React.Fragment>
    );
};

export default LightButton;