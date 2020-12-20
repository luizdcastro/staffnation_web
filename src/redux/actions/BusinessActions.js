
import * as constants from '../constants';

export const getMe = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/business/me',
        success: (response) => fetchMe(response),
    },
});


export const updateBusiness = (data, businessId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/business/update/${businessId}`,
        data,
        success: (response) => upddatedBusiness(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const fetchMe = (data) => ({
    type: constants.GET_ME,
    payload: data,
});

const upddatedBusiness = (data) => ({
    type: constants.UPDATE_BUSINESS,
    payload: data,
});
