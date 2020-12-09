import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import './styles'

import { logoutUser } from "../../redux/actions/AuthActions";


const HomePage = ({ dispatchLogout }) => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link onClick={dispatchLogout} >Logout</Link>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchLogout: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(HomePage);