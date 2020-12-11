import * as constants from '../../constants';

export default function imageReducer(state = {}, action) {
    switch (action.type) {
        case constants.UPLOAD_IMAGE:
            return { ...action.payload };
        case constants.DELETE_IMAGE:
            return { ...action.payload };
        case constants.RESET_IMAGE:
            return state = {};
        default:
            return state;
    }
}