import * as constants from '../../constants';

export default function storeReducer(state = {}, action) {
    switch (action.type) {
        case constants.CREATE_STORE:
            return { ...action.payload };
        case constants.GET_STORE:
            return { ...action.payload };
        case constants.GET_ALL_STORES:
            return { ...action.payload };
        case constants.UPDATE_STORE:
            return { ...action.payload };
        case constants.DELETE_STORE:
            return { ...action.payload };
        default:
            return state;
    }
}