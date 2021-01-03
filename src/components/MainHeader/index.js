import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as IoIcons from 'react-icons/io5'

import './styles.css'

const MainHeader = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false)

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    return (
        <div className="main-header">
            <nav className="main-header-nav">
                <div>
                    <h1 style={{ fontWeight: 800, fontSize: 28, color: '#7350ff' }}>staffnation</h1>
                </div>
                {width <= 500 ? (
                    <>
                        {!menuOpen ? (
                            <Link onClick={() => setMenuOpen(true)}>
                                <IoIcons.IoMenuSharp size={32} color="grey" />
                            </Link>
                        ) :
                            <div className="dropdown-container">
                                <div className="dropdown-menu">
                                    <Link className="close-menu__icon" onClick={() => setMenuOpen(false)}>
                                        <IoIcons.IoCloseOutline size={35} color="grey" />
                                    </Link>
                                    <Link
                                        className="menu-item-register"
                                        to="/register"
                                        onClick={() => setMenuOpen(false)}>
                                        Criar acesso
                                    </Link>
                                    <Link
                                        className="menu-item"
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}>
                                        <IoIcons.IoLogInOutline className="menu-dropdown__icon" size={32} />
                                        Login
                                        </Link>
                                </div>
                            </div>
                        }
                    </>
                ) :
                    <ul className="main-header-menu">
                        <li >
                            <Link className="main-header-link" to="/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link className="main-header-register" to="/register">Criar acesso</Link>
                        </li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default MainHeader