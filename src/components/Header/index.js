import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import './styles.css';

const Header = ({ isLoggedIn, onLogout }) => {
    function Navbar({ children }) {
        return (
            <nav className="nav-container">
                <Link className="nav-logo" to="/home">
                    staffnation
                </Link>
                <ul className="nav-menu">{children}</ul>
            </nav>
        );
    }

    function NavItem({ name, favoriteCounter, couponCounter, to }) {
        return (
            <li className="nav-item">
                <Link className="nav-link" to={to}>
                    {name}
                </Link>
                <div className="nav-fav__counter">
                    {favoriteCounter}
                    {couponCounter}
                </div>
            </li>
        );
    }

    return (
        <div className="header">
            <Navbar>
                <React.Fragment>
                    <NavItem name="Login" to="/login" />
                    <NavItem name="Registrar" to="/login" />
                </React.Fragment>
            </Navbar>
        </div>
    );
};

export default Header;
