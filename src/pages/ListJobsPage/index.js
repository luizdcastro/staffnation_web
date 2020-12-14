import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import JobCard from '../../components/JobCard'

import { getAllJobs } from '../../redux/actions/JobActions'

import './styles.css'

const ListJobsPage = ({ user, job, dispatchGetAllJobs }) => {
    const [value, setValue] = useState(0);
    const [openJobs, setOpenJobs] = useState(true)
    const [closeJobs, setCloseJobs] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatchGetAllJobs(user.businessId)
    }, [])


    return (
        <div className="list-jobs">
            <div style={{ flexGrow: 1, marginTop: -50, paddingTop: 0 }}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                    variant="fullWidth"
                >
                    <Tab label="Vagas abertas" style={{ textTransform: 'none', fontSize: '1rem' }} onClick={() => { setOpenJobs(true); setCloseJobs(false) }} />
                    <Tab label="Vagas fechadas" style={{ textTransform: 'none', fontSize: '1rem' }} onClick={() => { setOpenJobs(false); setCloseJobs(true) }} />
                </Tabs>
            </div>
            {openJobs ?
                <div className="list-jobs-main" >
                    <div className="list-jobs-container">
                        {job?.length
                            ? job.map((item) => (
                                <React.Fragment key={item._id}>
                                    <JobCard
                                        name={item.store.name}
                                        category={item.category}
                                        payment={item.payment}
                                        date={item.date}
                                        timeStart={item.time.start}
                                        timeEnd={item.time.end}
                                        image={item.store.image}
                                    />
                                </React.Fragment>
                            ))
                            : null}

                    </div>
                </div>

                :
                <div>
                    <p>Close Jobs</p>
                </div>
            }
        </div >
    )
}


const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllJobs: (businessAccount) => dispatch(getAllJobs(businessAccount)),
});

const mapStateToProps = (state) => ({
    user: state.user,
    job: state.job
});

export default connect(mapStateToProps, mapDispatchToProps)(ListJobsPage);
