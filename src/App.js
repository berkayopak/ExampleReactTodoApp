import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import TodoList from './components/TodoList';

function App(props) {
    if (props.user.loggedIn)
        return (
            <div className="App">
                <TodoList/>
            </div>
        );
    else
        return null;
}

export default connect((state) => ({
    user: state.user,
}))(App);
