import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import DevicesIcon from '@material-ui/icons/Devices';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import './styles.css';

const Header = ({ isLoggedIn, onLogout }) => {
    function Navbar({ children }) {
        return (
            <nav className="nav-container">
                <Link className="nav-logo" to="/home">
                    Staffnation
                </Link>
                <ul className="nav-menu">{children}</ul>
            </nav>
        );
    }

    function NavItem({ name, favoriteCounter, couponCounter, to }) {
        return (
            <li className="nav-item">
                <Link className={`nav-link__${isLoggedIn}`} to={to}>
                    {name}
                </Link>

                <div className="nav-fav__counter">
                    {favoriteCounter}
                    {couponCounter}
                </div>
            </li>
        );
    }

    function NavItemMenu({ name }) {
        const [open, setOpen] = useState(false);

        return (
            <li className="nav-item">
                <Link
                    className={`nav-link__${isLoggedIn}`}
                    onClick={() => setOpen(!open)}
                >
                    {name}
                </Link>
                <React.Fragment>
                    {open && isLoggedIn ? (
                        <div className="dropdown-container">
                            <div className="dropdown-menu">
                                <Link
                                    className="close-menu__icon"
                                    onClick={() => setOpen(!open)}
                                >
                                    <CloseIcon style={{ fontSize: 40 }} />
                                </Link>
                                <Link
                                    className="menu-item"
                                    to="/account"
                                    onClick={() => setOpen(!open)}
                                >
                                    <AccountBoxIcon className="menu-dropdown__icon" />
                  Perfil
                </Link>
                                <Link
                                    className="menu-item"
                                    to="/subscription"
                                    onClick={() => setOpen(!open)}
                                >
                                    <SubscriptionsIcon className="menu-dropdown__icon" />
                  Assinatura
                </Link>
                                <Link
                                    className="menu-item"
                                    to="/calculator"
                                    onClick={() => setOpen(!open)}
                                >
                                    <AssessmentIcon className="menu-dropdown__icon" />
                  Calculadora
                </Link>
                                <div className="menu-item__group">
                                    <Link className="menu-item" to onClick={() => setOpen(!open)}>
                                        <DevicesIcon className="menu-dropdown__icon" />
                    Descontos Online
                  </Link>
                                    <div className="menu-item__tag-online">
                                    </div>
                                </div>
                                <div className="menu-item__group">
                                    <Link className="menu-item" onClick={() => setOpen(!open)}>
                                        <LocalOfferIcon className="menu-dropdown__icon" />
                    Sorteios
                  </Link>
                                    <div className="menu-item__tag-sorteios">
                                    </div>
                                </div>
                                <Link className="menu-item" onClick={onLogout}>
                                    <ExitToAppIcon className="menu-dropdown__icon" />
                  Sair
                </Link>
                            </div>
                        </div>
                    ) : null}
                </React.Fragment>
            </li>
        );
    }

    function NavItemMenuPartner({ name }) {
        const [open, setOpen] = useState(false);

        return (
            <li className="nav-item">
                <Link
                    className={`nav-link__${isLoggedIn}`}
                    onClick={() => setOpen(!open)}
                >
                    {name}
                </Link>
                <React.Fragment>
                    {open && isLoggedIn ? (
                        <div className="dropdown-container">
                            <div className="dropdown-menu">
                                <Link
                                    className="close-menu__icon"
                                    onClick={() => setOpen(!open)}
                                >
                                    <CloseIcon style={{ fontSize: 40 }} />
                                </Link>
                                <Link
                                    className="menu-item"
                                    to="/account"
                                    onClick={() => setOpen(!open)}
                                >
                                    <AccountBoxIcon className="menu-dropdown__icon" />
                  Perfil
                </Link>
                                <Link className="menu-item" onClick={onLogout}>
                                    <ExitToAppIcon className="menu-dropdown__icon" />
                  Sair
                </Link>
                            </div>
                        </div>
                    ) : null}
                </React.Fragment>
            </li>
        );
    }

    return (
        <div className="header">
            <Navbar>
                {isLoggedIn ? (
                    <React.Fragment>
                        <NavItem
                            name={<FavoriteIcon style={{ fontSize: 20 }} />}
                            to="/favorites"
                        />
                        <NavItem
                            name={<LoyaltyIcon style={{ fontSize: 20 }} />}
                            to="/coupons"
                        />
                        <NavItemMenu name={<MenuIcon style={{ fontSize: 20 }} />} />
                    </React.Fragment>
                ) : isLoggedIn ? (
                    <React.Fragment>
                        <NavItemMenuPartner name={<MenuIcon style={{ fontSize: 20 }} />} />
                    </React.Fragment>
                ) : (
                            <React.Fragment>
                                <NavItem name="Login" to="/login" />
                                <NavItem name="Registrar" to="/register" />
                            </React.Fragment>
                        )}
            </Navbar>
        </div>
    );
};

export default Header;
