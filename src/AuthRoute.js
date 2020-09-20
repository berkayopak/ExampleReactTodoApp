import React from 'react';
import {connect} from 'react-redux';
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
    const { loggedIn } = props.user;

    if (loggedIn)
        return <Route {...props} />;
    else
        return <Redirect to="/signIn" />;
};

export default connect((state) => ({
    user: state.user,
}))(AuthRoute);
