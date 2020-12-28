import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser } from '../../redux/actions/AuthActions';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import LightButton from '../../components/LightButton'
import './styles.css'

const Login = ({ dispatchLoginAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchLoginAction(
      email,
      password,
      () => console.log('Logged In!'),
      (response) => setServerError(response.error)
    );
  };

  return (
    <div className="login-container">
      <div className="login-banner">
      </div>
      <div className="login-content">
        <div className="login">
          <form onSubmit={handleOnSubmmit}>
            <h1 className="login-title">Acessar minha conta</h1>
            <p className="login-label">Email</p>
            <FormInput
              id="login-input"
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <p className="login-label">Senha</p>
            <FormInput
              id="login-input__password"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            {serverError ? <p className="login-error">{serverError}</p> : null}
            <CustomButton id="login-button" name="Entrar" onClick={handleOnSubmmit} />
          </form>
          <Link className="login-link__password" to="/forgot-password">Esqueci minha senha</Link>
          <div className="login-separator">
            <p className="login-link__text">Ainda não tem uma conta?</p>
            <LightButton id="login-button-separator" name="Criar sua conta" to="/register" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAction: (email, password, onSuccess, onError) =>
    dispatch(loginUser({ email, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(Login);
