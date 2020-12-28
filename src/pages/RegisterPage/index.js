import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { loginUser } from '../../redux/actions/AuthActions';
import FormInput from '../../components/FormInput';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask'

import CustomButton from '../../components/CustomButton';
import * as FiIcons from 'react-icons/fi'
import * as IoIcons from 'react-icons/io5'
import './styles.css'


function PhoneMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}

        />
    );
}

PhoneMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const RegisterPage = ({ dispatchLoginAction }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [business, setBussines] = useState('')
    const [hireNumber, setHireNumber] = useState('')

    return (
        <div>
            <div className="register-container">
                <div className="register-banner">
                    <div className="register-background" />
                </div>
                <div className="register-content">
                    <div>
                        <Link style={{ display: 'flex', flexDirection: 'row', color: '#484848', alignItems: 'center', position: 'absolute', top: 25, right: 50 }} to="/">
                            <IoIcons.IoArrowBackOutline size={20} color="grey" />
                            <p style={{ fontSize: 20, color: '#484848', marginLeft: 4, fontWeight: 300 }}>Voltar</p>
                        </Link>
                        <p style={{ marginTop: 15, textAlign: 'center', fontSize: 30, fontWeight: 400, color: "#484848" }}>Queremos <span style={{ color: "#523BE4", }}>entender mais</span><br />sobre o seu negócio</p>
                        <div style={{ display: 'flex', height: '94%', justifyContent: 'center' }}>
                            <div className="register">
                                <form onSubmit={() => { }}>
                                    <p className="register-label">Nome</p>
                                    <FormInput
                                        id="register-input"
                                        placeholder="Digite seu nome"
                                        value={name}
                                        handleChange={(e) => setName(e.target.value)}
                                    />
                                    <p className="register-label">Email</p>
                                    <FormInput
                                        id="register-input"
                                        type="email"
                                        name="email"
                                        placeholder="Digite seu email"
                                        value={email}
                                        handleChange={(e) => setEmail(e.target.value)}
                                    />
                                    <p className="register-label">Telefone</p>
                                    <MaskedInput
                                        className="form-input"
                                        id="register-input"
                                        placeholder="Digite seu telefone"
                                        value={phone}
                                        handleChange={(e) => setPhone(e.target.value)}
                                        mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/]}
                                        placeholderChar={'\u2000'}
                                    />
                                    <p className="register-label">Estabelecimento</p>
                                    <FormInput
                                        id="register-input"
                                        placeholder="Digite o nome do negócio"
                                        value={business}
                                        handleChange={(e) => setBussines(e.target.value)}
                                    />
                                    <p className="register-label">Média de contratação semanal</p>
                                    <select className="form-input" id="register-input" style={{ backgroundColor: '#fff' }}>
                                        <option value="1">1-2</option>
                                        <option value="2">2-4</option>
                                        <option value="3">4-6</option>
                                        <option value="3">6-8</option>
                                        <option value="3">8-10</option>
                                        <option value="3">Acima de 10</option>
                                    </select>
                                    <CustomButton id="register-button" name="Solicitar Contato" onClick={() => { }} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchLoginAction: (email, password, onSuccess, onError) =>
        dispatch(loginUser({ email, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(RegisterPage);