import { combineReducers } from 'redux';

import user from './user/UserReducer';
import image from './image/ImageReducer'
import store from './store/StoreReducer'
import job from './job/JobReducer'

const rootReducer = combineReducers({
    user,
    image,
    store,
    job
});

export default rootReducer;