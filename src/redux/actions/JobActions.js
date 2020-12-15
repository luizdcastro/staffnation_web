import * as constants from '../constants';

export const createJob = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/job',
        data,
        success: (response) => createdJob(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const getJob = (jobId) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/job/${jobId}`,
        success: (response) => fetchJob(response),
    },
});

export const getAllJobs = (jobId) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/job?businessAccount=${jobId}`,
        success: (response) => fetchAllJobs(response),
    },
});

export const deleteJob = (jobId) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/job/${jobId}`,
        success: (response) => deletedJob(response),
    },
});

export const updateJob = (data, jobId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/job/${jobId}`,
        data,
        success: (response) => updatedJob(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const createdJob = (data) => ({
    type: constants.CREATE_JOB,
    payload: data,
});

const fetchJob = (data) => ({
    type: constants.GET_JOB,
    payload: data,
});

const fetchAllJobs = (data) => ({
    type: constants.GET_ALL_JOBS,
    payload: data,
});

const updatedJob = (data) => ({
    type: constants.UPDATE_JOB,
    payload: data,
});

const deletedJob = (data) => ({
    type: constants.DELETE_JOB,
    payload: data,
});



