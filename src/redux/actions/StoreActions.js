import * as constants from '../constants';

export const createStore = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/store',
        data,
        success: (response) => createdStore(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const getStore = (storeId) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/store/${storeId}`,
        success: (response) => fetchStore(response),
    },
});

export const getAllStores = (businessId) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/store?businessAccount=${businessId}`,
        success: (response) => fetchaAllStores(response),
    },
});

export const deleteStore = (storeId) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/store/${storeId}`,
        success: (response) => deleteJob(response),
    },
});

export const updateStore = (data, storeId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/store/update/${storeId}`,
        data,
        success: (response) => updatedStore(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const createdStore = (data) => ({
    type: constants.CREATE_STORE,
    payload: data,
});

const fetchStore = (data) => ({
    type: constants.GET_STORE,
    payload: data,
});

const fetchaAllStores = (data) => ({
    type: constants.GET_ALL_STORES,
    payload: data,
});

const updatedStore = (data) => ({
    type: constants.UPDATE_STORE,
    payload: data,
});

const deleteJob = (data) => ({
    type: constants.DELETE_STORE,
    payload: data,
});



