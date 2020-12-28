import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './styles.css'
import Rating from '@material-ui/lab/Rating';
import * as IoIcons from "react-icons/io5"
import * as FiIcons from "react-icons/fi";


const StaffCardAccepted = ({ name, image, rating, phone, neighborhood, city, categories = [] }) => {
    const [value, setValue] = useState(0)

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
                <div className="staffAccepted-button-content">
                    <p className="staffAccepted-card-text">Liberar pagamento</p>
                    <Link className="staffAccepted-button-payment" to="#">
                        <p style={{ fontWeight: 700 }}>R$ 150,00</p>
                        <FiIcons.FiArrowRight size="14" style={{ marginLeft: 6 }} />
                    </Link>
                </div>
                <div className="staffAccepted-button-content">
                    <p className="staffAccepted-card-text">Avaliação</p>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default StaffCardAccepted