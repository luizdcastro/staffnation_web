import { combineReducers } from 'redux';

import user from './user/UserReducer';
import image from './image/ImageReducer'
import store from './store/StoreReducer'
import job from './job/JobReducer'
import staff from './staff/StaffReducer'
import business from './business/BusinessReducer'

const rootReducer = combineReducers({
    user,
    image,
    store,
    job,
    staff,
    business
});

export default rootReducer;