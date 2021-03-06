import React, { useState, useEffect, useMemo } from 'react';
import { connect } from "react-redux";
import MaskedInput from 'react-text-mask'
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import CustomButton from '../../components/CustomButton'
import UploadImage from '../../components/UploadImage'

import { getStore, updateStore } from '../../redux/actions/StoreActions'
import { resetImage } from '../../redux/actions/ImageActions'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";


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

const EditStorePage = ({ image, store, dispatchResetImage, dispatchGetStore, dispatchUpdateStore }) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('');
    const [phone, setPhone] = useState('')
    const [cep, setCep] = useState('')
    const [number, setNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [bairro, setBairro] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState({})
    const [cepError, setCepError] = useState('')
    const [createError, setCreateError] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState([]);
    let uploadedImage = image.url
    let history = useHistory();
    const { storeId } = useParams()

    useEffect(() =>
        dispatchGetStore(storeId),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [storeId])

    const editableData = store

    useMemo(() => {
        if (editableData.data) {
            setName(editableData.data?.name);
            setCategory(editableData.data?.category)
            setPhone(editableData.data?.phone)
            setCep(editableData.data?.address.cep)
            setNumber(editableData.data?.address.number)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editableData]);

    const handleUpdateStore = (event) => {
        event.preventDefault();
        dispatchUpdateStore(
            name,
            phone,
            category,
            address,
            uploadedImage,
            storeId,
            () => {
                history.push("/business");
                dispatchResetImage()
            },
            (response) => { setCreateError(response.error); console.log(createError) }
        );
    };


    const getUserAddress = () => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                if (data.erro) {
                    setCepError(true);
                    console.log(cepError)
                    setAddress({});
                } else {
                    setCepError(false);
                    setStreet(data.logradouro);
                    setCity(data.localidade);
                    setBairro(data.bairro);
                    setState(data.uf);
                    setAddress({
                        cep: data.cep,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf,
                        number: "",
                    });
                }
            });
    };

    useEffect(() => {
        if (cep.length >= 8) {
            getUserAddress();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cep]);

    useEffect(() => {
        if (number.length) {
            setAddress({ ...address, number: number });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number]);

    return (
        <div className="editStore">
            <div className="editStore-create">
                <form className="busines-create-form" onSubmit={handleUpdateStore}>
                    <div >
                        <h2 className="editStore-create-title">Editar estabelecimento</h2>
                        <TextField
                            label="Nome do negócio"
                            size="small"
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            style={{ width: 350 }}
                        />
                        <TextField
                            select
                            size="small"
                            variant="outlined"
                            label="Categoria"
                            SelectProps={{
                                native: true,
                            }}
                            value={category}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: 350, marginTop: 15 }}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" defaultValue hidden>Categoria</option>
                            <option value="Bar">Bar</option>
                            <option value="Café">Café</option>
                            <option value="Restaurante">Resturante</option>
                            <option value="Casa Noturna">Casa Noturna</option>
                        </TextField>
                        <TextField
                            label="Telefone"
                            value={phone}
                            size="small"
                            variant="outlined"
                            style={{ width: 350, marginTop: 15 }}
                            InputProps={{
                                inputComponent: PhoneMaskCustom,
                            }}

                        />
                        <TextField
                            label="CEP"
                            size="small"
                            variant="outlined"
                            onChange={(e) => setCep(e.target.value)}
                            value={cep}
                            style={{ width: 350, marginTop: 15 }}
                            inputProps={{ maxLength: 8 }}
                        />
                        <div className="form-bussiness-adress">
                            <div>
                                <TextField
                                    label="Rua"
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setStreet(e.target.value)}
                                    value={street}
                                    style={{ width: 277, marginTop: 15, marginRight: 3 }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Nº"
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setNumber(e.target.value)}
                                    value={number}
                                    style={{ width: 70, marginTop: 15 }}
                                />
                            </div>
                        </div>
                        <div className="form-bussiness-adress">
                            <div>
                                <TextField
                                    label="Bairro"
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setBairro(e.target.value)}
                                    value={bairro}
                                    style={{ width: 137, marginTop: 15, marginRight: 3 }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Cidade"
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    style={{ width: 137, marginTop: 15, marginRight: 3, marginBottom: 15 }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="UF"
                                    size="small"
                                    variant="outlined"
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                    style={{ width: 70, marginTop: 15 }}
                                />
                            </div>
                        </div>
                        <UploadImage imageUrl uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                        <CustomButton name="Salvar" id="editStore-create-button" onClick={handleUpdateStore} />

                    </div>
                </form>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    dispatchResetImage: () => dispatch(resetImage()),
    dispatchGetStore: (storeId) => dispatch(getStore(storeId)),
    dispatchUpdateStore: (name, phone, category, address, image, storeId, onSuccess, onError) =>
        dispatch(updateStore({ name, phone, category, address, image }, storeId, onSuccess, onError)),
});

const mapStateToProps = (state) => ({
    user: state.user,
    image: state.image,
    store: state.store
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStorePage);