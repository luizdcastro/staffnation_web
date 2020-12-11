import { combineReducers } from 'redux';

import user from './user/UserReducer';
import image from './image/ImageReducer'
import store from './store/StoreReducer'

const rootReducer = combineReducers({
    user,
    image,
    store
});

export default rootReducer;