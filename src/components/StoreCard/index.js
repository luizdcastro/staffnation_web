import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'


const StoreCard = ({ name, category, phone, street, number, neighborhood, city, state, image, storeId }) => {
    return (
        <div className="store-card">
            <img src={image} className="store-image" />
            <div className="store-main-content">
                <p className="store-card-title">{name}</p>
                <p className="store-card-category">Categoria: {category}</p>
                <p className="store-card-text">Contato: {phone}</p>
                <p className="store-card-text">{street}, {number}</p>
                <p className="store-card-text">{neighborhood}, {city} - {state}</p>
            </div>
            <div className="store-button-content">
                <Link className="store-button-edit" to={`/edit-store/${storeId}`} >
                    <FiIcons.FiEdit size={22} />
                </Link>
            </div>
        </div>
    )
}

export default StoreCard