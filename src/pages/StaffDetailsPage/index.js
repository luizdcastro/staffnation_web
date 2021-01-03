import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'
import * as IoIcons from "react-icons/io5"

import LightButton from "../../components/LightButton";
import { getStaff } from '../../redux/actions/StaffActions'

import './styles.css'

const StaffDetailsPage = ({ dispatchGetStaff, staff, job }) => {
    const [staffData, setStaffData] = useState([])
    const [pendingJobs, setPendingJobs] = useState([])
    const [acceptedJobs, setAcceptedJobs] = useState([])
    const [inviteJob, setInvateJob] = useState('')
    const { staffId } = useParams()

    useEffect(() => {
        setStaffData(staff.filter(el => el._id == staffId))
    }, [staffId])

    useEffect(() => {
        setPendingJobs(job.map(job => job.applicationsPending
            .some(el => el._id == staffId)
        ))
    }, [staffId])

    useEffect(() => {
        setAcceptedJobs(job.map(job => job.applicationsAccepted
            .some(el => el._id == staffId)
        ))
    }, [staffId])

    return (
        <div className="staff-details">
            <div className="staff-details-card">
                <div style={{ width: '80%' }}>
                    <div className="staff-details-card-header">
                        <img src={staffData[0]?.avatar.url} className="staff-details-avatar" />
                        <div style={{ marginLeft: 20 }}>
                            <h2 className="staff-details-title">{staffData[0]?.name}</h2>
                            <div style={{ display: 'flex' }}>
                                <div style={{ marginRight: 40 }}>
                                    <div className="staff-jobs-data">
                                        <p className="staff-jobs-data-text">{staffData[0]?.rating.toFixed(2)}</p>
                                        <IoIcons.IoStar color="grey" size={16} style={{ marginLeft: 3, paddingBottom: 3 }} />
                                    </div>
                                    <p>Avaliação</p>
                                </div>
                                <div>
                                    <div className="staff-jobs-data" >
                                        <p className="staff-jobs-data-text">2</p>
                                    </div>
                                    <p>Trabalhos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="staff-section">
                        <p className="staff-card-section-title">Dados pessoais</p>
                        <p>Idade: {2021 - parseInt(staffData[0]?.birthdayDate.slice(6, 10))}</p>
                        <p>Gênero: {staffData[0]?.gender}</p>
                        <p>Telefone: {staffData[0]?.phone}</p>
                        <p>Endereço: {staffData[0]?.address.neighborhood}, {staffData[0]?.address.city} - {staffData[0]?.address.state} </p>
                    </div>
                    <div className="staff-section">
                        <p className="staff-card-section-title">Informações profissionais</p>
                        {staffData[0]?.categories.map((item) => (
                            <React.Fragment key={item._id}>
                                <div style={{ marginBottom: 10 }}>
                                    <p>Categoria: {item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                                    {item.experiencia === 0 ?
                                        <p>Experiência: {item.experiencia}-6 meses</p> :
                                        <p>Experiência: {item.experiencia} {item.experiencia <= 1 ? 'ano' : 'anos'}</p>
                                    }
                                    <p>Possui certificação: {item.certificado ? 'Sim' : 'Não'}</p>
                                </div>
                            </React.Fragment>
                        ))
                        }
                    </div>
                    {!pendingJobs.includes(true) ?
                        <div className="staff-invite-job">
                            <p className="staff-card-section-title">Convidar para uma vaga</p>
                            <div>
                                <select className="staff-job-select">
                                    <option value="" defaultValue hidden>Selecionar vaga</option>
                                    {job?.length
                                        ? job.map((item) => (
                                            <React.Fragment key={item._id}>
                                                <option value={item._id}>{item.category} - {item.date.slice(0, 5)}</option>
                                            </React.Fragment>
                                        ))
                                        : null
                                    }
                                </select>
                                <LightButton name="Enviar convite" id="staff-details-button-light" onClick={() => { }} />
                            </div>
                        </div>
                        :
                        <div className="staff-invite-job">
                            <p className="staff-card-section-title">Aceitar candidatura?</p>
                            <LightButton name="Confirmar" id="staff-details-button-light" onClick={() => { }} />
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetStaff: (staffId) => dispatch(getStaff(staffId)),
});

const mapStateToProps = (state) => ({
    staff: state.staff,
    job: state.job,
})


export default connect(mapStateToProps, mapDispatchToProps)(StaffDetailsPage)