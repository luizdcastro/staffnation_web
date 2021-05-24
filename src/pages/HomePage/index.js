import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'


import './styles.css'

const HomePage = () => {
    return (
        <div className="home">
            <div className="dashboard-card_container">
                <div className="dashboard-card-1">
                    <FiIcons.FiUsers size={24} color="#fff" />
                    <p className="dashboard-card-title">Vagas Abertas</p>
                    <p className="dashboard-card-subtitle">3</p>
                    <Link to="/list-jobs" className="dashboard-card-link">Visualizar vagas</Link>
                </div>
                <div className="dashboard-card-2">
                <FiIcons.FiGrid size={24} color="#fff" />
                    <p className="dashboard-card-title">Negocíos Cadastrados</p>
                    <p className="dashboard-card-subtitle">10</p>
                    <Link to="/business" className="dashboard-card-link">Mostrar estabelecimentos</Link>
                </div>
                <div className="dashboard-card-3">
                    <FiIcons.FiRepeat size={24} color="#fff" />
                    <p className="dashboard-card-title">Saldo Atual</p>
                    <p className="dashboard-card-subtitle">R$ 1.500,00</p>
                    <Link to="/finance" className="dashboard-card-link">Adicionar fundos</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);