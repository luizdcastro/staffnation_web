import React, { useState, useEffect, useMemo } from 'react'
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

import CustomButton from '../../components/CustomButton'
import LightButton from '../../components/LightButton'
import { logoutUser } from "../../redux/actions/AuthActions";
import { getMe, updateBusiness } from '../../redux/actions/BusinessActions'

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

const SettingsPage = ({ business, dispatchLogout, disptachGetMe, dispatchUpdateBusiness }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => disptachGetMe(), [])

    const editableData = business

    useMemo(() => {
        if (editableData) {
            setName(editableData?.data.name);
            setEmail(editableData?.data.email)
            setPhone(editableData.data.phone)
        }
    }, [editableData]);

    const handleLogOut = (event) => {
        event.preventDefault();
        dispatchLogout()
    }

    const handleUpdateBusiness = (event) => {
        event.preventDefault();
        dispatchUpdateBusiness(
            name,
            email,
            phone,
            business.data._id,
            () => disptachGetMe(),
            (error) => console.log(error)
        )
    }

    return (
        <div className="settings">
            <div className="settings-form">
                <div >
                    <form onSubmit={handleUpdateBusiness}>
                        <p className="settings-form-title">Dados da Conta</p>
                        <TextField
                            label="Nome"
                            size="small"
                            variant="outlined"
                            style={{ width: 350 }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Telefone"
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            InputProps={{
                                inputComponent: PhoneMaskCustom,
                            }}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <LightButton name="Salvar Alteração" id="settings-button-light" onClick={handleUpdateBusiness} />
                    </form>
                    <Divider style={{ width: 350, marginBottom: 25, marginTop: 25 }} />
                    <form onSubmit={() => { }}>
                        <p className="settings-form-title">Alterar Senha</p>
                        <TextField
                            label="Nova senha "
                            size="small"
                            variant="outlined"
                            style={{ width: 350 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirmar senha"
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <LightButton name="Salvar Alteração" id="settings-button-light" onClick={() => { }} />
                    </form>
                    <Divider style={{ width: 350, marginBottom: 25, marginTop: 25 }} />
                    <form onSubmit={handleLogOut}>
                        <CustomButton name="Sair" id="settings-button" onClick={handleLogOut} />
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    business: state.business
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLogout: () => dispatch(logoutUser()),
    disptachGetMe: () => dispatch(getMe()),
    dispatchUpdateBusiness: (name, email, phone, businessId, onSuccess, onError) =>
        dispatch(updateBusiness({ name, email, phone }, businessId, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);