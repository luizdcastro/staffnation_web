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

const fetchAllStaffs = (data) => ({
    type: constants.GET_ALL_STAFFS,
    payload: data,
});