
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

export const createFavorite = (data, businessId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/business/addFavorite/${businessId}`,
        data,
        success: (response) => addedFavorite(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const removeFavorite = (data, businessId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/business/deleteFavorite/${businessId}`,
        data,
        success: (response) => deletedFavorite(response),
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

const addedFavorite = (data) => ({
    type: constants.ADD_FAVORITE,
    payload: data,
});
const deletedFavorite = (data) => ({
    type: constants.DELETE_FAVORITE,
    payload: data,
});
