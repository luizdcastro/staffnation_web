import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import * as IoIcons from "react-icons/io5"
import * as MdIcons from "react-icons/md";

const StaffCardSearch = ({
    name,
    image,
    rating,
    phone,
    neighborhood,
    city,
    categories = [],
    handleAccepted,
    favoriteStaffs,
    staffId,
    addFavorite,
    deleteFavorite
}) => {

    return (
        <div className="staff-search-card">
            <img src={image} alt="" className="staff-search-image" />
            <div className="staff-search-main-content">
                <p className="staff-search-card-title">{name.split(" ", 1)}</p>
                <div style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }}>
                    <p className="staff-search-card-text ">{rating}</p>
                    <IoIcons.IoStar color="grey" size={12} style={{ marginLeft: 3, marginBottom: 3 }} />
                </div>
                <div style={{ display: 'flex', marginBottom: 5 }}>
                    {categories.length >= 1 ?
                        categories.map((item) => (
                            <React.Fragment key={item._id}>
                                <div className="staff-search-category-box">
                                    <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                                </div>
                            </React.Fragment>
                        ))
                        : null}
                </div>
                <p className="staff-search-card-text">{phone}</p>
                <p className="staff-search-card-text ">{neighborhood} - {city}</p>
            </div>
            <div style={{ display: 'block' }}>
                <div className="staff-button-content">
                    <Link className="staff-button-favorite">
                        {!favoriteStaffs.some(el => el._id == staffId) ?
                            <MdIcons.MdFavoriteBorder size={25} onClick={addFavorite} />
                            :
                            <MdIcons.MdFavorite size={25} color="#ff595e" onClick={deleteFavorite} />
                        }
                    </Link>
                </div>
                <div className="staff-button-content">
                    <Link className="staff-button-next" to={`/staff/${staffId}`}>
                        <MdIcons.MdArrowForward size={25} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default StaffCardSearch