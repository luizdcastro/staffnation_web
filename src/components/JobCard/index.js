import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'

const JobCard = ({ name, category, payment, date, timeStart, timeEnd, image, jobId }) => {
    return (
        <div className="job-card">
            <img src={image} alt="" className="job-image" />
            <div className="job-main-content">
                <p className="job-card-title">{name}</p>
                <p className="job-card-category">Função: {category}</p>
                <p className="job-card-text">Pagamento: {payment}</p>
                <p className="job-card-text">Data: {date}</p>
                <p className="job-card-text">Horário: {timeStart} às {timeEnd}</p>
            </div>
            <div style={{ display: 'block' }}>
                <div className="job-button-content">
                    <Link className="job-button-next" to={`/job/${jobId}`}>
                        <FiIcons.FiArrowRight size={22} />
                    </Link>
                </div>
                <div className="job-button-content">
                    <Link className="job-button-edit" to={`/edit-job/${jobId}`}>
                        <FiIcons.FiEdit size={22} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default JobCard