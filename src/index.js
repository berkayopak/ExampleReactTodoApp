import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store/configureStore'
import SignIn from './components/Signin';
import Header from "./partials/header";
import AuthRoute from "./AuthRoute";

const Root = ({ store }) => (
    <Provider store={store}>
        <Header/>
        <Router>
            <AuthRoute exact path="/" component={App} />
            <Route exact path="/signIn" component={SignIn}/>
        </Router>
    </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
