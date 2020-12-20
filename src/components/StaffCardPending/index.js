import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css'
import * as IoIcons from "react-icons/io5"
import * as FiIcons from "react-icons/fi";


const StaffCardPending = ({ name, image, rating, phone, neighborhood, city, categories = [], handleAccepted }) => {
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
                    <p className="staffAccepted-card-text">Aceitar candidatura</p>
                    <Link className="staffAccepted-button-payment" onClick={handleAccepted}>
                        <p style={{ fontWeight: 600 }}>Confirmar</p>
                        <FiIcons.FiArrowRight size="14" style={{ marginLeft: 6 }} />
                    </Link>
                </div>
                <div className="staffAccepted-button-content">
                </div>
            </div>
        </div>
    )
}

export default StaffCardPending