import {LOGIN_ACTION, LOGOUT_ACTION, LOGIN_ERROR_ACTION} from '../../actions/types'

const localStorageUserJSON = localStorage.getItem('userState');
const localStorageUser = JSON.parse(localStorageUserJSON);

const noUserState = {
    loggedIn: false,
    user: {
        id: 0,
        username: '',
        firstName: '',
        lastName: ''
    },
    loginError: false,
    loginErrorMessage: '',
};
const userState = localStorageUser ? localStorageUser : noUserState;

const userReducer = (state = userState, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            return {...state, user: action.payload, loggedIn: true, loginError: false, loginErrorMessage: ''};
        case LOGOUT_ACTION:
            return noUserState;
        case LOGIN_ERROR_ACTION:
            return {...state, loginError: true, loginErrorMessage: action.error};
        default:
            return state;
    }
};
export default userReducer