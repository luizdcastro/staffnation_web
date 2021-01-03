import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './styles.css'
import Rating from '@material-ui/lab/Rating';
import * as IoIcons from "react-icons/io5"
import * as FiIcons from "react-icons/fi";


const StaffCardAccepted = ({ name, image, rating, phone, neighborhood, city, categories = [] }) => {
    const [value, setValue] = useState(0)
    const [paymentDone, setPaymentDone] = useState(false)

    return (
        <div className="staffAccepted-card">
            <img src={image} alt="" className="staffAccepted-image" />
            <div className="staffAccepted-main-content">
                <p className="staffAccepted-card-title">{name}</p>
                <div style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }}>
                    <p className="staffAccepted-card-text ">{rating}</p>
                    <IoIcons.IoStar color="grey" size={12} style={{ marginLeft: 3 }} />
                </div>
                <div style={{ display: 'flex', marginBottom: 5 }}>
                    {categories.length >= 1 ?
                        categories.map((item) => (
                            <React.Fragment key={item._id}>
                                <div className="staffAccepted-category-box ">
                                    <p>{item.name}</p>
                                </div>
                            </React.Fragment>
                        ))
                        : null}
                </div>
                <p className="staffAccepted-card-text">{phone}</p>
                <p className="staffAccepted-card-text ">{neighborhood} - {city}</p>
            </div>
            <div style={{ display: 'block' }}>
                {!paymentDone ?
                    <div style={{ paddingRight: 20, marginTop: 5 }}>
                        <p>Liberar pagamento</p>
                        <p style={{ marginBottom: 5 }}>Valor: 150,00</p>
                        <Link className="staff-pending-confirm-button" onClick={() => { setPaymentDone(true) }} >
                            Confirmar
                            </Link>
                    </div> :
                    <div style={{ paddingRight: 20, marginTop: 4 }}>
                        <p >Pagamento efetuado!</p>
                        <p style={{ marginBottom: 10 }}>Valor: 150,00</p>
                        <p >Avaliação</p>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default StaffCardAccepted