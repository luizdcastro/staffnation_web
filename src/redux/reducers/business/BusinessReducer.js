import * as constants from '../../constants';

export default function businessReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_ME:
            return { ...action.payload };
        default:
            return state;
    }
}