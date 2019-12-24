import {combineReducers} from 'redux';
import User from './user_reducers';
import News from './news_reducers';
import Games from './games_reducers';

const rootReducer = combineReducers({
    User,
    News,
    Games
})

export default rootReducer;