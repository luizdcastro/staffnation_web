import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import CustomButton from '../../components/CustomButton'
import './styles.css'

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

import { getAllStores } from '../../redux/actions/StoreActions'
import { updateJob } from '../../redux/actions/JobActions'

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


const EditJobPage = ({ user, store, job, dispatchGetAllStores, dispatchUpdateJob }) => {
    const [jobData, setJobData] = useState([])
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
    const [payment, setPayment] = useState('')
    const [description, setDescription] = useState('')
    let history = useHistory();
    const { jobId } = useParams()

    const [values, setValues] = useState('');

    useEffect(() => {
        setJobData(job.filter(el => el._id == jobId))
    }, [jobId])


    const handleChange = (event) => {
        setValues({
            values,
            [event.target.name]: event.target.value,
        });
        setPayment(event.target.value)
    }

    const editableData = jobData

    useMemo(() => {
        if (editableData[0]) {
            setSelecteStore(editableData[0]?.store._id);
            setCategory(editableData[0]?.category);
            setPositions(editableData[0]?.positions);
            setPayment(editableData[0]?.payment);
            setDate(editableData[0]?.date)
            setTimeStart(editableData[0]?.time.start)
            setTimeEnd(editableData[0]?.time.end)
            setDescription(editableData[0]?.description)
        }
    }, [editableData]);

    useEffect(() => {
        dispatchGetAllStores(user.businessId)
        setAvaliableStores(store)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleEditJob = (event) => {
        event.preventDefault();
        dispatchUpdateJob(
            selectedStore,
            category,
            positions,
            date,
            time,
            payment,
            description,
            jobId,
            history.push("/list-jobs"),
            error => console.log(error),
        )
    }

    return (
        <div className="editJob">
            <div className="editJob-create">
                <form className="editJob-create-form" onSubmit={handleEditJob}>
                    <div className="editJob-create-form__container">
                        <h2 className="editJob-create-title">Editar vaga de trabalho</h2>
                        <TextField
                            label="Estabelecimento"
                            select
                            size="small"
                            variant="outlined"
                            SelectProps={{
                                native: true,
                            }}
                            style={{ width: 350 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setSelecteStore(e.target.value)}
                            value={selectedStore}
                        >
                            <option value="" defaultValue hidden>{editableData[0]?.store.name}</option>
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
                            margin="normal"
                            SelectProps={{
                                native: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: 350, marginTop: 15 }}
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="" defaultValue hidden>{editableData[0]?.category}</option>
                            <option value="Bar">Bar</option>
                            <option value="Cozinha">Cozinha</option>
                            <option value="Garçom">Garçom</option>
                            <option value="Segurança">Segurança</option>
                            <option value="Limpeza">Limpeza</option>
                            <option value="Hostess">Hostess</option>
                        </TextField>
                        <TextField
                            label="Vaga"
                            select
                            size="small"
                            variant="outlined"
                            SelectProps={{
                                native: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: 350, marginTop: 15 }}
                            onChange={(e) => setPositions(e.target.value)}
                            value={positions}
                        >
                            <option value="" defaultValue hidden>{editableData[0]?.positions}</option>
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
                            inputProps={{
                                maxLength: 9
                            }}
                            onChange={handleChange}
                            value={payment}
                        />
                        <TextField
                            label="Data"
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            InputProps={{
                                inputComponent: DateMaskCustom,
                            }}
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
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
                                    onChange={(e) => setTimeStart(e.target.value)}
                                    value={timeStart}
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
                                    onChange={(e) => setTimeEnd(e.target.value)}
                                    value={timeEnd}
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
                                maxLength: 152
                            }}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <CustomButton name="Cadastrar" id="editJob-create-button" onClick={handleEditJob} />
                    </div>
                </form>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllStores: (businessAccount) => dispatch(getAllStores(businessAccount)), dispatchUpdateJob: (store, category, positions, date, time, payment, description, jobId, onSuccess, onError) =>
        dispatch(updateJob({ store, category, positions, date, time, payment, description }, jobId, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    user: state.user,
    store: state.store,
    job: state.job
});

export default connect(mapStateToProps, mapDispatchToProps)(EditJobPage);