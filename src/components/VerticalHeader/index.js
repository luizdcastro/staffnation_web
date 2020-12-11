import React from 'react'
import { Link } from 'react-router-dom'

import * as FiIcons from 'react-icons/fi'

import './styles.css'

const VerticalHeader = ({ onLogout, pageName }) => {

    return (
        <>
            <div className="navbar-vertical">
                <p className="navbar-vertical-title">{pageName}</p>
            </div>
            <nav className="nav-menu-vertical">
                <div className="logo-vertical">
                    <p className="logo-vertical-text">staffnation</p>
                </div>
                <div className="top-menu">
                    <ul>
                        <li>
                            <Link to="/home" className="menu-link">
                                <FiIcons.FiCalendar color="#523BE4" size={20} />
                                <p className="menu-link-text">Home</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/business" className="menu-link">
                                <FiIcons.FiGrid color="#523BE4" size={20} />
                                <p className="menu-link-text">Meu negócio</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/jobs" className="menu-link">
                                <FiIcons.FiFolderPlus color="#523BE4" size={20} />
                                <p className="menu-link-text">Criar vaga</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="bottom-menu">
                    <ul>
                        <li >
                            <Link to="#" className="menu-link" onClick={onLogout}>
                                <FiIcons.FiLogOut color="#523BE4" size={20} />
                                <p className="menu-link-text">Sair</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default VerticalHeader