import { combineReducers } from 'redux';
import filteredReducer from './filteredReducer';

const rootReducer = combineReducers({
    data: filteredReducer,
});

export default rootReducer;
