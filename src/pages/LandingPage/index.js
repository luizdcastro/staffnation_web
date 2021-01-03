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
        <div className="landing-page">
            <MainHeader />
            <div>
                <div className="home-hero__container">
                    <div className="home-page__hero">
                        <div className="hero-main">
                            <h1 className="hero-main__title">
                                Um novo jeito<br />de contratar profissionais <br />para seu negócio</h1>
                            <h3 className="hero-main__subtitle">
                                Encontre garçons, bartenders, seguranças e outros staffs <br />para bares, restaurantes ou eventos de forma simples.</h3>
                            <Link id="custom-button" to="register">Criar conta grátis</Link>
                        </div>
                        <div className="home-main__image">
                            <div>
                                <img
                                    className="image-card__business"
                                    src={Banner}
                                    alt="business"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-main__container">
                    <div className="home-page__main">
                        <div className="home-main__content">
                            <div className="home-main__items">
                                <div className="home-main__card">
                                    <h3 className="home-main__title">Why chose Rocketcab</h3>
                                    <ul>
                                        <li className="home-main__list">
                                            <img
                                                className="main-items__icon"
                                                src={Banner}
                                                alt=""
                                            />
                                            <div>
                                                <h2 className="main-items__title">Lorem ipsum dolor sit amet.</h2>
                                                <p className="main-items__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sodales ex a mi ultricies dictum. Proin fringilla acmetus a.</p>
                                            </div>
                                        </li>
                                        <li className="home-main__list">
                                            <img
                                                className="main-items__icon"
                                                src={Banner}
                                                alt=""
                                            />
                                            <div>
                                                <h2 className="main-items__title">Lorem ipsum dolor sit amet.</h2>
                                                <p className="main-items__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. ex a mi ultricies dictum. Proin fringilla</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="home-main__items">
                                <div className="home-main__card">
                                    <h3 className="home-main__title">Why chose Rocketcab</h3>
                                    <ul>
                                        <li className="home-main__list">
                                            <img
                                                className="main-items__icon"
                                                src={Banner}
                                                alt=""
                                            />
                                            <div>
                                                <h2 className="main-items__title">Lorem ipsum dolor sit amet.</h2>
                                                <p className="main-items__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sodales ex a mi ultricies dictum. Proin fringilla acmetus a.</p>
                                            </div>
                                        </li>
                                        <li className="home-main__list">
                                            <img
                                                className="main-items__icon"
                                                src={Banner}
                                                alt=""
                                            />
                                            <div>
                                                <h2 className="main-items__title">Lorem ipsum dolor sit amet.</h2>
                                                <p className="main-items__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. ex a mi ultricies dictum. Proin fringilla</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="home-card">
                            <div className="home-card__text">
                                <p className="card-text__call">Rocketcab Business</p>
                                <h3 className="card-text__title">
                                    Lorem ipsum dolor sit amet, consectetur.</h3>
                                <p className="card-text__content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis ipsum diam, id eleifend libero maximus ut. Vivamus imperdiet eros iaculis est blandit bibendum. Phasellustempus congue lorem eu bibendum.</p>
                                <Link className="card-text__link" to="register-partner">Seja um parceiro Rocketcab</Link>
                            </div>
                            <div className="home-card__image">
                                <img
                                    className="image-card__business"
                                    src={BannerTwo}
                                    alt="business"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="home-sub__container">
                        <div className="home-page__sub">
                            <div className="page-sub__content">
                                <h2 className="page-sub__title">Lorem ipsum dolor sit consectetur.</h2>
                                <p className="page-sub__text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquampretium dolor in.</p>
                            </div>
                            <div>
                                <ul className="home-sub__items">
                                    <li className="home-sub__item">
                                        <img className="home-sub__icons" src={Banner} alt="icon" />
                                        <h3>Lorem ipsum dolor amet.</h3>
                                        <p> Extra safety and hygiene measures so that you can ride around the city as safely as ever</p>
                                    </li>
                                    <li className="home-sub__item">
                                        <img className="home-sub__icons" src={Banner} alt="icon" />
                                        <h3>Lorem ipsum dolor amet.</h3>
                                        <p>Extra safety and hygiene measures so that you can ride around the city as safely as ever.</p>
                                    </li>
                                    <li className="home-sub__item">
                                        <img className="home-sub__icons" src={Banner} alt="icon" />
                                        <h3>Lorem ipsum dolor amet.</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare faucibus sollicitudin. Nam viverra felis.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-page__footer">
                    <div className="home-footer">
                        <div className="home-footer__box">
                            <h3 className="footer-box__text">Rocketcab está em sua cidade</h3>
                            <h2 className="footer-box__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio porta.</h2>
                            <Link id="footer-box__button"> Saiba mais sobre nossos serviços</Link>
                        </div>
                        <div className="footer-box__copy">
                            <p>@2020 Staffnation Internet Ltda.</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default LandingPage