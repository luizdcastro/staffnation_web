import { Home } from '@material-ui/icons';
import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { logoutUser } from "../../redux/actions/AuthActions";


import './styles.css'

const HomePage = ({ dispatchLogout }) => {
    return (
        <div className="home">
            <Link onClick={dispatchLogout}>Log out</Link>
        </div>
    );
}

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
    dispatchLogout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);