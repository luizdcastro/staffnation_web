import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import MaskedInput from 'react-text-mask'

import FormBusiness from '../../components/FormBusiness'
import CustomButton from '../../components/CustomButton'
import InactiveButton from '../../components/InactiveButton'
import UploadImage from '../../components/UploadImage'

import { createStore } from '../../redux/actions/StoreActions'
import { resetImage } from '../../redux/actions/ImageActions'

import './styles.css'

const BusinessPage = ({ image, user, dispatchCreateStore, dispatchResetImage }) => {
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
    }, [cep]);

    useEffect(() => {
        if (number.length) {
            setAddress({ ...address, number: number });
        }
    }, [number, address]);

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
            <div className="business-list">
                <h2>Meus estabelecimentos</h2>
            </div>
            <div className="business-create">
                <form className="busines-create-form" onSubmit={handleCreateStore}>
                    <div className="busines-create-form__container">
                        <h2 className="business-create-title">Cadastrar novo estabelecimento</h2>
                        <p className="business-create-label">Nome do negócio</p>
                        <FormBusiness
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className="business-create-label">Categoria</p>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            className="business-create-selector">
                            <option value="" defaultValue hidden> Selecionar</option>
                            <option value="Bar">Bar</option>
                            <option value="Café">Café</option>
                            <option value="Restaurante">Resturante</option>
                            <option value="Casa Noturna">Casa Noturna</option>
                        </select>
                        <p className="business-create-label">Telefone</p>
                        <MaskedInput
                            className="form-business-input"
                            mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/]}
                            placeholderChar={"\u2000"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <p className="business-create-label">CEP</p>
                        <FormBusiness
                            maxLength={8}
                            value={cep}
                            onChange={(e) => setCep(e.target.value)} />
                        <div className="form-bussiness-adress">
                            <div>
                                <p className="business-create-label">Rua</p>
                                <FormBusiness
                                    id="business-addess-street"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="business-create-label"> Número</p>
                                <FormBusiness id="business-address-number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-bussiness-adress">
                            <div>
                                <p className="business-create-label">Bairro</p>
                                <FormBusiness id="business-address-bairro"
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="business-create-label">Cidade</p>
                                <FormBusiness
                                    id="business-address-city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="business-create-label">Estado</p>
                                <FormBusiness
                                    id="business-address-state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                        </div>
                        <p className="business-create-label">Imagem</p>
                        <UploadImage imageUrl uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                        {name?.length > 2 ?
                            <CustomButton name="Cadastrar" id="business-create-button" onClick={handleCreateStore} />
                            :
                            <InactiveButton name="Cadastrar" id="business-create-button" />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    dispatchCreateStore: (businessAccount, name, phone, category, address, image, onSuccess, onError) =>
        dispatch(createStore({ businessAccount, name, phone, category, address, image }, onSuccess, onError)),
    dispatchResetImage: () => dispatch(resetImage()),
});

const mapStateToProps = (state) => ({
    user: state.user,
    image: state.image,
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);