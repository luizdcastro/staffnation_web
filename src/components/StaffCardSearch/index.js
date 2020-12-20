import React from 'react'
import './styles.css'
import * as IoIcons from "react-icons/io5"


const StaffCardSearch = ({ name, image, rating, phone, neighborhood, city, categories = [], handleAccepted }) => {

    return (
        <div className="staff-search-card">
            <img src={image} alt="" className="staff-search-image" />
            <div className="staff-search-main-content">
                <p className="staff-search-card-title">{name}</p>
                <div style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }}>
                    <p className="staff-search-card-text ">{rating}</p>
                    <IoIcons.IoStar color="grey" size={12} style={{ marginLeft: 3 }} />
                </div>
                <div style={{ display: 'flex', marginBottom: 5 }}>
                    {categories.length >= 1 ?
                        categories.map((item) => (
                            <React.Fragment key={item._id}>
                                <div className="staff-search-category-box ">
                                    <p>{item.name}</p>
                                </div>
                            </React.Fragment>
                        ))
                        : null}
                </div>
                <p className="staff-search-card-text">{phone}</p>
                <p className="staff-search-card-text ">{neighborhood} - {city}</p>
            </div>
            <div style={{ display: 'block' }}>
                <div className="staff-search-button-content">
                    <p className="staff-search-card-text"></p>

                </div>
                <div className="staff-search-button-content">
                </div>
            </div>
        </div>
    )
}

export default StaffCardSearch