import {combineReducers} from 'redux';
import User from './user_reducers';
import News from './news_reducers';

const rootReducer = combineReducers({
    User,
    News
})

export default rootReducer;