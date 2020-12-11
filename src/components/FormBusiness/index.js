import React from 'react'
import './styles.css'

const FormBusiness = ({ handleChange, ...otherProps }) => {
    return (
        <div>
            <input className="form-business-input" onChange={handleChange} {...otherProps} />
        </div>
    )
}

export default FormBusiness