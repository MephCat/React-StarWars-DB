import React from 'react';

import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error"/>
            <span className="boom"> Boom!!!</span>
            <span>
                somthing has gone terribly wrong
            </span>
            <span>
                ( but we alreadly droidsto fix it)
            </span>
        </div>
    )
}
export default ErrorIndicator