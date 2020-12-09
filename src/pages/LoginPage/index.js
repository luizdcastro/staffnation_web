import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser } from '../../redux/actions/AuthActions';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
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
      (response) => console.log(response),
      (response) => setServerError(response.error)
    );
  };

  return (
    <div className="login-container">
      <div>
        <form className="login" onSubmit={handleOnSubmmit}>
          <h2 className="login-title">Faça seu login</h2>
          <div className="login-input__group">
            <FormInput
              id="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <EmailIcon className="login-input__icon" />
          </div>
          <div className="login-input__group">
            <FormInput
              id="login-input__password"
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <LockIcon className="login-input__icon" />
            <Link className="login-link__password" to="/forgot-password">
              Esqueci minha senha
            </Link>
          </div>
          <CustomButton id="login-button" name="Entrar" onClick={handleOnSubmmit} />
          <div className="login-link__container">
            <p className="login-link__text">Não tem uma conta? <span><Link to="/register" className="login-link">
              Registre-se </Link></span></p>
          </div>
          {serverError ? <p className="login-error">{serverError}</p> : null}
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAction: (email, password, onSuccess, onError) =>
    dispatch(loginUser({ email, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(Login);
