import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import CustomButton from '../../components/CustomButton'
import './styles.css'

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

import { getAllStores } from '../../redux/actions/StoreActions'
import { createJob } from '../../redux/actions/JobActions'

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
};


const CreateJobPage = ({ user, store, dispatchGetAllStores, dispatchCreateJob }) => {
    const [selectedStore, setSelecteStore] = useState('')
    const [avaliableStores, setAvaliableStores] = useState([])
    const [category, setCategory] = useState('')
    const [positions, setPositions] = useState('')
    const [date, setDate] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const time = {
        start: timeStart,
        end: timeEnd
    }
    const [description, setDescription] = useState('')
    let history = useHistory();


    const [values, setValues] = useState({
        textmask: '',
        numberformat: '',
    });

    useEffect(() => {
        dispatchGetAllStores(user.businessId)
        setAvaliableStores(store)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    const handleCreateJob = (event) => {
        event.preventDefault();
        dispatchCreateJob(
            user.businessId,
            selectedStore,
            category,
            positions,
            date,
            time,
            values.numberformat,
            description,
            () => history.push("/list-jobs"),
            error => console.log(error),
        )
    }



    return (
        <div className="createJob">
            <div className="createJob-create">
                <form className="createJob-create-form" onSubmit={handleCreateJob}>
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
                            value={selectedStore}
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}}    
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
                            value={category}
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}}    
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
                            onChange={(e) => setPositions(e.target.value)}
                            value={positions}
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}}    
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
                            name="numberformat"
                            id="formatted-numberformat-input"
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}                           
                            onChange={handleChange}
                            value={values.numberformat}
                            inputProps={{
                                maxLength: 9,
                                style: {fontSize: 14}
                            }}
                            InputLabelProps={{style: {fontSize: 14}}}    
                        />
                        <TextField
                            label="Data"
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            InputProps={{
                                inputComponent: DateMaskCustom,
                                style: {fontSize: 14}
                            }}
                            InputLabelProps={{style: {fontSize: 14}}}  
                            onChange={(e) => setDate(e.target.value)}
                            valeu={date}

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
                                        style: {fontSize: 14}
                                    }}
                                    InputLabelProps={{style: {fontSize: 14}}}
                                    onChange={(e) => setTimeStart(e.target.value)}
                                    valeu={timeStart}
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
                                        style: {fontSize: 14}
                                    }}
                                    InputLabelProps={{style: {fontSize: 14}}}  
                                    onChange={(e) => setTimeEnd(e.target.value)}
                                    valeu={timeEnd}
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
                                maxLength: 152,
                                style: {fontSize: 14}
                            }}
                            InputLabelProps={{style: {fontSize: 14}}}   
                            onChange={(e) => setDescription(e.target.value)}
                            valeu={description}
                        />
                        <CustomButton name="Cadastrar Vaga" id="createJob-create-button" onClick={handleCreateJob} />
                    </div>
                </form>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllStores: (businessAccount) => dispatch(getAllStores(businessAccount)),
    dispatchCreateJob: (businessAccount, store, category, positions, date, time, payment, description, onSuccess, onError) =>
        dispatch(createJob({ businessAccount, store, category, positions, date, time, payment, description }, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    user: state.user,
    store: state.store
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobPage);