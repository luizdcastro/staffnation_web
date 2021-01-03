import * as constants from '../../constants';

export default function staffReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_ALL_STAFFS:
            return [...action.payload];
        case constants.GET_STAFF:
            return [...action.payload];
        default:
            return state;
    }
}