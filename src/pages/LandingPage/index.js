import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MainHeader from '../../components/MainHeader'
import Banner from '../../assets/business_login.png'
import BannerTwo from '../../assets/restaurant_table.jpg'
import Heart from '../../assets/heart.png'
import Star from '../../assets/star.png'

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
                <div className="landing-page_hero_container">
                    <div className="landing-page_hero">
                        <h1 className="hero-title">Um jeito novo de <br />contratar sua equipe.</h1>
                        <h2 className="hero-subtitle">Contrate garçons, bartenders, seguranças e muito mais<br />para seu estabelecimento ou evento de forma simples.</h2>
                        <div className="hero-button__container">
                            <Link className="hero-button" to="#">Encontrar Profissionais</Link>
                        </div>
                    </div>                  
                </div>
            </div>
        </div>
    )
}

export default LandingPage