import * as constants from '../constants';

export const getAllStaffs = (onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/user',
        success: (response) => fetchAllStaffs(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const getStaff = (staffId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/user/${staffId}`,
        success: (response) => fetchStaff(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const fetchAllStaffs = (data) => ({
    type: constants.GET_ALL_STAFFS,
    payload: data,
});

const fetchStaff = (data) => ({
    type: constants.GET_STAFF,
    payload: data,
});