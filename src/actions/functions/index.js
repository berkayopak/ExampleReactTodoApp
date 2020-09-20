import {
    LOGIN_ACTION,
    LOGOUT_ACTION,
    LOGIN_ERROR_ACTION,

    CLEAR_TODO_LIST_ACTION,
    LOAD_TODO_LIST_FAILURE_ACTION,
    LOAD_TODO_LIST_REQUEST_ACTION,
    LOAD_TODO_LIST_SUCCESS_ACTION,

    ADD_TODO_ACTION,
    DELETE_TODO_ACTION,
    EDIT_TODO_ACTION,

    SYNC_TODO_LIST_FAILURE_ACTION,
    SYNC_TODO_LIST_REQUEST_ACTION,
    SYNC_TODO_LIST_SUCCESS_ACTION,
    SYNC_TODO_LIST_IDLE_ACTION
} from '../types';
import {signInAnonymously} from "../../firebase/auth";
import {
    addTodoItemToCollection,
    deleteTodoItemFromCollection,
    editTodoItemFromCollection,
    getAllTodoItems
} from "../../firebase/firestore";

import {USER_STATE_NAME} from "../../helper";

export function login(user) {
    return dispatch => {
        if(user && user.username && user.firstName) {
            signInAnonymously().then(function (res) {
                const userState = {
                    id: res.user.uid,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                };

                localStorage.setItem(USER_STATE_NAME, JSON.stringify({
                    user: userState,
                    loggedIn: true,
                    loginError: false,
                    loginErrorMessage: ''
                }));

                dispatch({
                    type: LOGIN_ACTION,
                    payload: userState
                })
            }).catch(function (err) {
                dispatch({
                    type: LOGIN_ERROR_ACTION,
                    error: err?.message
                })
            });
        }
    }
}

export function logout() {
    localStorage.removeItem(USER_STATE_NAME);
    return dispatch => {
        dispatch({type: LOGOUT_ACTION});
        dispatch({type: CLEAR_TODO_LIST_ACTION});
    }
}

export function loadTodoList(user) {
    return dispatch => {
        dispatch({
            type: LOAD_TODO_LIST_REQUEST_ACTION
        });

        getAllTodoItems(user).then(function (res) {
            dispatch({
                type: LOAD_TODO_LIST_SUCCESS_ACTION,
                payload: {
                    todoList: res
                }
            })
        }).catch(function (err) {
            dispatch({
                type: LOAD_TODO_LIST_FAILURE_ACTION,
                payload: {
                    error : err?.message
                }
            })
        });
    }
}

export function addTodo(todo, user) {
    return dispatch => {
        dispatch({
            type: SYNC_TODO_LIST_REQUEST_ACTION,
        });
        addTodoItemToCollection(todo, user).then(function (res) {
            todo.id = res.id;

            dispatch({
                type: SYNC_TODO_LIST_SUCCESS_ACTION,
            });
            dispatch({
                type: ADD_TODO_ACTION,
                payload: {
                    todo: todo
                }
            });
        }).catch(function (err) {
            dispatch({
                type: SYNC_TODO_LIST_FAILURE_ACTION,
                payload: {
                    error : err?.message
                }
            })
        })

    }
}

export function deleteTodo(todo) {
    return dispatch => {
        dispatch({
            type: SYNC_TODO_LIST_REQUEST_ACTION,
        });
        dispatch({
            type: DELETE_TODO_ACTION,
            payload: {
                todo: todo
            }
        });

        deleteTodoItemFromCollection(todo).then(function (res) {
            dispatch({
                type: SYNC_TODO_LIST_SUCCESS_ACTION
            });
        }).catch(function (err) {
            dispatch({
                type: SYNC_TODO_LIST_FAILURE_ACTION,
                payload: {
                    error: err?.message
                }
            });
        })
    }
}

export function editTodo(todo, user) {
    return dispatch => {
        dispatch({
            type: EDIT_TODO_ACTION,
            payload: {
                todo: todo
            }
        });
        dispatch({
            type: SYNC_TODO_LIST_REQUEST_ACTION
        });
        editTodoItemFromCollection(todo, user).then(function (res) {
            dispatch({
                type: SYNC_TODO_LIST_SUCCESS_ACTION
            });
        }).catch(function (err) {
            dispatch({
                type: SYNC_TODO_LIST_FAILURE_ACTION,
                payload: {
                    error: err?.message
                }
            });
        });

    }
}

export function syncIdle() {
    return dispatch => {
        dispatch({type: SYNC_TODO_LIST_IDLE_ACTION});
    }
}