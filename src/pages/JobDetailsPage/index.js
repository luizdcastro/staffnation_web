import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getJob, createAccepted, removeAccepted, createPending, removePending } from '../../redux/actions/JobActions'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import StaffCardAccepted from '../../components/StaffCardAccepted'
import StaffCardPending from '../../components/StaffCardPending'
import './styles.css'

const JobDetailsPage = ({
    job,
    dispatchGetJob,
    dispatchCreateAccepted,
    dispatchCreatePending,
    dispatchRemoveAccepted,
    dispatchRemovePending
}) => {
    const [value, setValue] = useState(0);
    const [accepted, setAccepted] = useState(true)
    const [pending, setPending] = useState(false)
    const { jobId } = useParams()

    useEffect(() => {
        dispatchGetJob(jobId)
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function sendPushNotification(tokenId, name, business) {
        const data = {
            to: tokenId,
            title: 'Staffnation',
            sound: 'default',
            body: `Olá, ${name}. O estabelecimento ${business} confirmou sua candidatura!`
        };

        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <div className="jobDetails">
            <div style={{ display: 'block', width: 1050 }}>
                <div className="job-details-info">
                    <p style={{ fontSize: 12, color: '#523BE4', fontWeight: 600, textTransform: 'uppercase' }}>Estabelecimento</p>
                    <p style={{ fontSize: 15, color: '#484848', marginBottom: 12 }}>{job[0]?.store.name}</p>
                    <p style={{ fontSize: 12, color: '#523BE4', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 }}>Informações</p>
                    <p className="job-details-text">Função: {job[0]?.category}</p>
                    <p className="job-details-text">Pagamento: R$ {job[0]?.payment.toFixed(2)}</p>
                    <p className="job-details-text">Data: {job[0]?.date}</p>
                    <p className="job-details-text">Horário: {job[0]?.time.start} às {job[0]?.time.end}</p>
                    <p className="job-details-text">Descrição: {job[0]?.description} </p>
                    <p style={{ fontSize: 12, color: '#523BE4', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3, marginTop: 15 }}>Endereço</p>
                    <p className="job-details-text">{job[0]?.store.address.street}, Nº {job[0]?.store.address.number}</p>
                    <p className="job-details-text">{job[0]?.store.address.neighborhood}, {job[0]?.store.address.city} - {job[0]?.store.address.state}</p>
                </div>
                <div style={{ flexGrow: 1, marginTop: 10 }}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        variant="fullWidth"
                        style={{ marginBottom: 20 }}>
                        <Tab label="Equipe confirmada" style={{ textTransform: 'none', fontSize: '1rem' }} onClick={() => { setAccepted(true); setPending(false) }} />
                        <Tab label="Candidatos pendentes" style={{ textTransform: 'none', fontSize: '1rem' }} onClick={() => { setAccepted(false); setPending(true) }} />
                    </Tabs>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {accepted ? (
                        job[0]
                            ? job[0].applicationsAccepted.map((item) => (
                                <React.Fragment key={item._id}>
                                    <StaffCardAccepted
                                        image={item.avatar.url}
                                        name={item.name}
                                        rating={item.rating.toFixed(2)}
                                        phone={item.phone}
                                        neighborhood={item.address?.neighborhood}
                                        city={item.address?.city}
                                        categories={item.categories}
                                    />
                                </React.Fragment>
                            ))
                            : null

                    ) : job[0]
                            ? job[0].applicationsPending.map((item) => (
                                <React.Fragment key={item._id}>
                                    <StaffCardPending
                                        image={item.avatar.url}
                                        name={item.name}
                                        rating={item.rating.toFixed(2)}
                                        phone={item.phone}
                                        neighborhood={item.address?.neighborhood}
                                        city={item.address?.city}
                                        categories={item.categories}
                                        handleAccepted={() => {
                                            dispatchCreateAccepted(
                                                item._id,
                                                jobId,
                                                () => {
                                                    dispatchRemovePending(item._id, jobId);
                                                    dispatchGetJob(jobId);
                                                    sendPushNotification('ExponentPushToken[m4358uHMYWMDzWrnHBAQ7k]', item.name, 'Teste')
                                                },
                                                (error) => console.log(error)
                                            )
                                        }}
                                    />
                                </React.Fragment>
                            ))
                            : null
                    }
                </div>
            </div>
        </div >
    )
}
const mapDispatchToProps = (dispatch) => ({
    dispatchGetJob: (storeId) => dispatch(getJob(storeId)),
    dispatchCreateAccepted: (applicationsAccepted, jobId, onSuccess, onError) =>
        dispatch(createAccepted({ applicationsAccepted }, jobId, onSuccess, onError)),
    dispatchCreatePending: (applicationsPending, jobId, onSuccess, onError) =>
        dispatch(createPending({ applicationsPending }, jobId, onSuccess, onError)),
    dispatchRemoveAccepted: (applicationsAccepted, jobId) =>
        dispatch(removeAccepted({ applicationsAccepted }, jobId)),
    dispatchRemovePending: (applicationsPending, jobId) =>
        dispatch(removePending({ applicationsPending }, jobId)),
});

const mapStateToProps = (state) => ({
    job: state.job
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsPage);