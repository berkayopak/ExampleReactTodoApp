import {
    CLEAR_TODO_LIST_ACTION,
    LOAD_TODO_LIST_SUCCESS_ACTION,
    LOAD_TODO_LIST_REQUEST_ACTION,
    LOAD_TODO_LIST_FAILURE_ACTION,
    ADD_TODO_ACTION,
    EDIT_TODO_ACTION,
    DELETE_TODO_ACTION,
    SYNC_TODO_LIST_SUCCESS_ACTION,
    SYNC_TODO_LIST_REQUEST_ACTION,
    SYNC_TODO_LIST_FAILURE_ACTION,
    SYNC_TODO_LIST_IDLE_ACTION
} from '../../actions/types'

import {syncStates} from "../../enums";

const initialTodoState = {
    todoList: [],
    isLoading : true,
    hasError : false,
    errorMessage : '',
    syncStatus: syncStates.IDLE,
    syncErrorMessage : '',
};

const todoReducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case CLEAR_TODO_LIST_ACTION:
            return initialTodoState;
        case LOAD_TODO_LIST_REQUEST_ACTION:
            return {...state, isLoading: true, hasError: false};
        case LOAD_TODO_LIST_SUCCESS_ACTION:
            return {...state, todoList: action.payload.todoList, isLoading: false, hasError: false};
        case LOAD_TODO_LIST_FAILURE_ACTION:
            return {...state, errorMessage: action.payload.error, isLoading: false, hasError: true};
        case ADD_TODO_ACTION:
            const updatedTodoList = [...state.todoList, action.payload.todo];
            return {...state, todoList: updatedTodoList};
        case EDIT_TODO_ACTION:
            state.todoList.filter(todo => todo.id == action.payload.todo.id)[0].description = action.payload.todo.description;
            return {...state};
        case DELETE_TODO_ACTION:
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload.todo.id);
            return {...state};
        case SYNC_TODO_LIST_REQUEST_ACTION:
            return {...state, syncStatus: syncStates.SYNCING, syncErrorMessage: ''};
        case SYNC_TODO_LIST_SUCCESS_ACTION:
            return {...state, syncStatus: syncStates.SYNCED, syncErrorMessage: ''};
        case SYNC_TODO_LIST_FAILURE_ACTION:
            return {...state, syncStatus: syncStates.ERROR, syncErrorMessage: action.payload.error};
        case SYNC_TODO_LIST_IDLE_ACTION:
            return {...state, syncStatus: syncStates.IDLE, syncErrorMessage: ''};
        default:
            return state;
    }
};
export default todoReducer