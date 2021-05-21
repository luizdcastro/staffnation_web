import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MainHeader from '../../components/MainHeader'
import Banner from '../../assets/business_login.png'
import BannerTwo from '../../assets/restaurant_table.jpg'

import './styles.css'

const LandingPage = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const percentage = (width / 100) * 30

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    console.log((width - percentage) / 2)

    return (
        <div>
            <MainHeader />
            <div className="landing-page">
                <div className="landing-page_hero">
                    <h1 className="hero-title">Um novo jeito de contratar <br />profissionais para seu negócio.</h1>
                    <h2 className="hero-subtitle">Encontre garçons, bartenders, seguranças e outros staffs <br />para bares, restaurantes ou eventos de forma simples.</h2>
                    <div className="hero-button__container">
                        <Link className="hero-button" to="#">Encontrar Staff</Link>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default LandingPage