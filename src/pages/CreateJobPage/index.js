import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import CustomButton from '../../components/CustomButton'
import { getAllStores } from '../../redux/actions/StoreActions'
import './styles.css'

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function PhoneMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

PhoneMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};


function DateMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-3]/, /[0-9]/, '/', /[0-1]/, /[1-9]/, '/', /[2]/, /[0]/, /[2]/, /[0-9]/]}
            placeholderChar={'\u2000'}
            placeholder="dd/mm/aaaa"

        />
    );
}

DateMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};


function TimeMskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/^([0-2])/, /([0-9])/, ':', /[0-5]/, /[0-9]/]}
            placeholderChar={'\u2000'}
            placeholder="hh:mm"

        />
    );
}

TimeMskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            isNumericString
            placeholder="R$ 0,00"
            prefix="R$ "
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    maxLength: 3
};


const CreateJobPage = ({ user, store, dispatchGetAllStores }) => {
    const [selectedStore, setSelecteStore] = useState('')
    const [avaliableStores, setAvaliableStores] = useState([])
    const [category, setCategory] = useState('')
    const [time, setTime] = useState([])

    const [values, setValues] = useState({
        textmask: '',
        numberformat: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    useEffect(() => {
        dispatchGetAllStores(user.businessId)
        setAvaliableStores(store)
    }, [])

    return (
        <div className="createJob">
            <div className="createJob-create">
                <form className="createJob-create-form" onSubmit={() => { }}>
                    <div className="createJob-create-form__container">
                        <h2 className="createJob-create-title">Anunciar vaga de trabalho</h2>
                        <TextField
                            label="Estabelecimento"
                            select
                            size="small"
                            variant="outlined"
                            SelectProps={{
                                native: true,
                            }}
                            style={{ width: 350 }}
                            onChange={(e) => setSelecteStore(e.target.value)}
                        >
                            <option value="" defaultValue hidden></option>
                            {avaliableStores?.length
                                ? store.map((item) => (
                                    <React.Fragment key={item._id}>
                                        <option value={item._id}>{item.name}</option>
                                    </React.Fragment>
                                ))
                                : null
                            }
                        </TextField>
                        <TextField
                            label="Função"
                            select
                            size="small"
                            variant="outlined"
                            SelectProps={{
                                native: true,
                            }}
                            style={{ width: 350, marginTop: 15 }}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" defaultValue hidden></option>
                            <option value="Bar">Bar</option>
                            <option value="Cozinha">Cozinha</option>
                            <option value="Garçom">Garçom</option>
                            <option value="Segurança">Segurança</option>
                            <option value="Limpeza">Limpeza</option>
                            <option value="Hostess">Hostess</option>
                        </TextField>
                        <TextField
                            label="Vagas"
                            select
                            size="small"
                            variant="outlined"
                            SelectProps={{
                                native: true,
                            }}
                            style={{ width: 350, marginTop: 15 }}
                        >
                            <option value="" defaultValue hidden></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </TextField>
                        <TextField
                            label="Pagamento"
                            value={values.numberformat}
                            onChange={handleChange}
                            name="numberformat"
                            id="formatted-numberformat-input"
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                            inputProps={{
                                maxlength: 9
                            }}
                        />
                        <TextField
                            label="Data"
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            InputProps={{
                                inputComponent: DateMaskCustom,
                            }}
                        />
                        <div className="form-bussiness-adress">
                            <div>
                                <TextField
                                    label="Início"
                                    size="small"
                                    variant="outlined"
                                    style={{ width: 173.5, marginTop: 15, marginRight: 3 }}
                                    InputProps={{
                                        inputComponent: TimeMskCustom,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Término"
                                    size="small"
                                    variant="outlined"
                                    style={{ width: 173.5, marginTop: 15 }}
                                    InputProps={{
                                        inputComponent: TimeMskCustom,
                                    }}
                                />
                            </div>
                        </div>
                        <TextField
                            id="outlined-textarea"
                            label="Observações"
                            size="small"
                            rowsMax={4}
                            placeholder="Ex: utilizar sapato preto"
                            multiline
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            inputProps={{
                                maxlength: 152
                            }}

                        />
                        <CustomButton name="Cadastrar" id="createJob-create-button" onClick={() => { }} />

                    </div>
                </form>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllStores: (businessAccount) => dispatch(getAllStores(businessAccount)),
});

const mapStateToProps = (state) => ({
    user: state.user,
    store: state.store
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobPage);