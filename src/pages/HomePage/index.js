import React from 'react';
import { connect } from "react-redux";

import './styles.css'

const HomePage = () => {
    return (
        <div className="home">
            <h1>Home Page</h1>
        </div>
    )
}

export default connect(null, null)(HomePage);