import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css'
import * as IoIcons from "react-icons/io5"
import * as MdIcons from "react-icons/md";

import LightButton from '../../components/LightButton'


const StaffCardPending = ({ name, image, rating, phone, neighborhood, city, categories = [], handleAccepted, staffId }) => {
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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link className="staff-button-next" to={`/staff/${staffId}`}>
                        <MdIcons.MdArrowForward size={25} />
                    </Link>
                </div>
                <div style={{ paddingRight: 20, marginTop: 20, }}>
                    <p style={{ marginBottom: 5 }}>Aceitar candidatura?</p>
                    <Link className="staff-pending-confirm-button" onClick={handleAccepted} >
                        Confirmar
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default StaffCardPending