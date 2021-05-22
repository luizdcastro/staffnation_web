import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as IoIcons from 'react-icons/io5'

import './styles.css'

const MainHeader = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false)
    const [navbar, setNavbar] = useState(false)

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    const changebackgound = () => {
        if (window.scrollY >= 70) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    window.addEventListener('scroll', changebackgound)

    return (
        <div className={navbar ? 'main-header active' : 'main-header'}>
            <nav className="main-header-nav">
                <div>
                    <Link className="main-header-logo" to="#">staffnation</Link>
                </div>
                <div>
                {width >= 600 ? (
                    <ul className="main-header-menu">
                        <li >
                            <Link className="main-header-link-middle" to="#">Home</Link>
                        </li>
                        <li >
                            <Link className="main-header-link-middle" to="#">Plataforma</Link>
                        </li>
                        <li >
                            <Link className="main-header-link-middle" to="#">Suporte</Link>
                        </li>
                    </ul>
                ) : null}
                </div>
                {width <= 600 ? (
                    <>
                        {!menuOpen ? (
                            <Link onClick={() => setMenuOpen(true)}>
                                <IoIcons.IoMenuSharp size={35   } color="grey" />
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
                                        onClick={() => setMenuOpen(false)}>Criar Conta
                                        </Link>
                                    <Link
                                        className="menu-item-login"
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}>Entrar 
                                        </Link>
                                        <Link
                                        className="menu-item"
                                        to="#"
                                        onClick={() => setMenuOpen(false)}>Home 
                                        </Link>
                                        <Link
                                        className="menu-item"
                                        to="#"
                                        onClick={() => setMenuOpen(false)}>Plataforma 
                                        </Link>
                                        <Link
                                        className="menu-item"
                                        to="#"
                                        onClick={() => setMenuOpen(false)}>Suporte 
                                        </Link>
                                </div>
                            </div>
                        }
                    </>
                ) :
                    <ul className="main-header-menu">
                        <li >
                            <Link className="main-header-link" to="/login">
                                Entrar
                            </Link>
                        </li>
                        <li>
                            <Link className="main-header-register" to="/register">Criar Conta</Link>
                        </li>
                    </ul>

                }
            </nav>
        </div>
    )
}

export default MainHeader