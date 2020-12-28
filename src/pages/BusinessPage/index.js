import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import MaskedInput from 'react-text-mask'
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import CustomButton from '../../components/CustomButton'
import UploadImage from '../../components/UploadImage'
import StoreCard from '../../components/StoreCard'

import { createStore, getAllStores } from '../../redux/actions/StoreActions'
import { resetImage } from '../../redux/actions/ImageActions'
import NoResult from '../../assets/no-result-search.png'

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

const BusinessPage = ({
    image,
    user,
    store,
    dispatchCreateStore,
    dispatchResetImage,
    dispatchGetAllStores,
}) => {
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
    const uploadedImage = image.url

    useEffect(() => {
        dispatchGetAllStores(user.businessId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const handleCreateStore = (event) => {
        event.preventDefault();
        dispatchCreateStore(
            user.businessId,
            name,
            phone,
            category,
            address,
            uploadedImage,
            () => {
                dispatchGetAllStores(user.businessId)
                setName('');
                setCategory('');
                setCep('');
                setStreet('');
                setNumber('');
                setBairro('');
                setPhone('');
                setCity('');
                setState('');
                setUploadedFiles([])
                dispatchResetImage()
            },
            (response) => { setCreateError(response.error); console.log(createError) }
        );
    };

    return (
        <div className="business">
            <div style={{ width: 1200, display: 'flex', flexWrap: 'wrap' }}>
                <div className="business-list">
                    <div style={{ marginTop: '5%' }}>
                        <h2 className="business-list-title">Meus estabelecimentos</h2>
                        <div className="business-list-container">
                            {store?.length
                                ? store.map((item) => (
                                    <React.Fragment key={item._id}>
                                        <StoreCard
                                            name={item.name}
                                            category={item.category}
                                            phone={item.phone}
                                            street={item.address?.street}
                                            number={item.address?.number}
                                            neighborhood={item.address?.neighborhood}
                                            city={item.address?.city}
                                            state={item.address?.state}
                                            image={item.image}
                                            storeId={item._id}
                                        />
                                    </React.Fragment>
                                ))
                                :
                                <div style={{ marginTop: 50 }}>
                                    <p style={{ fontWeight: 400, color: 'grey', fontSize: 18, textAlign: 'center' }}>Nenhum item foi encontrado!</p>
                                    <p style={{ fontWeight: 300, color: 'grey', fontSize: 14, textAlign: 'center' }}>Você pode criar seus estabelecimentos no formulário ao lado :) </p>
                                    <img src={NoResult} style={{ width: 350, height: 270, marginTop: 50 }} />
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <div className="business-create">
                    <form className="busines-create-form" onSubmit={handleCreateStore}>
                        <div >
                            <h2 className="business-create-title">Cadastrar novo estabelecimento</h2>
                            <TextField
                                label="Nome do negócio"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                style={{ width: 350 }}
                            />
                            <TextField
                                label="Categoria"
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
                                <option value="Café">Café</option>
                                <option value="Restaurante">Resturante</option>
                                <option value="Casa Noturna">Casa Noturna</option>
                            </TextField>
                            <TextField
                                label="Telefone"
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
                            <CustomButton name="Cadastrar" id="business-create-button" onClick={handleCreateStore} />

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    dispatchCreateStore: (businessAccount, name, phone, category, address, image, onSuccess, onError) =>
        dispatch(createStore({ businessAccount, name, phone, category, address, image }, onSuccess, onError)),
    dispatchResetImage: () => dispatch(resetImage()),
    dispatchGetAllStores: (businessAccount) => dispatch(getAllStores(businessAccount)),
});

const mapStateToProps = (state) => ({
    user: state.user,
    image: state.image,
    store: state.store
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);