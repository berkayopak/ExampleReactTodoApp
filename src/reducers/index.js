import {combineReducers} from 'redux';
import userReducer from './user'
import todoReducer from "./todo";

const rootReducer = combineReducers({
    user: userReducer,
    todo: todoReducer
});
export default rootReducer