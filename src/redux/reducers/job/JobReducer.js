import * as constants from '../../constants';

export default function storeReducer(state = [], action) {
    switch (action.type) {
        case constants.CREATE_JOB:
            return { ...action.payload };
        case constants.GET_JOB:
            return { ...action.payload };
        case constants.GET_ALL_JOBS:
            return [...action.payload];
        case constants.UPDATE_JOB:
            return { ...action.payload };
        case constants.DELETE_JOB:
            return { ...action.payload };
        default:
            return state;
    }
}