import React from 'react';
import { connect } from "react-redux";

import './styles.css'

const HomePage = () => {
    return (
        <div className="home">
        </div>
    );
}

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);