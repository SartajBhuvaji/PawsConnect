import {combineReducers} from 'redux';
import { userReducer } from 'react';

const rootReducer = combineReducers({
    userState: userReducer,
});

export default rootReducer;
