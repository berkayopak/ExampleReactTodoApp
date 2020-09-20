import React from 'react';
import { connect } from 'react-redux';
import {login} from "../../actions/functions";
import {Card, Form, Button, Alert} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.scss';
import { Redirect } from "react-router";


function SignIn(props) {
    function signIn(e){
        e.preventDefault();
        const user = {
            username : e.target.elements.formUsername.value,
            firstName : e.target.elements.formFirstName.value,
            lastName : e.target.elements.formLastName.value
        };
        props.dispatch(login(user));
    }

    if(props.user && !props.user.loggedIn) {
        return (
            <div className="middle-page">
                <Card>
                    <Card.Body>
                        <Form onSubmit={signIn}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username (*)</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" required pattern="^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"/>
                            </Form.Group>

                            <Form.Group controlId="formFirstName">
                                <Form.Label>First name (*)</Form.Label>
                                <Form.Control type="text" placeholder="First name" required pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"/>
                            </Form.Group>

                            <Form.Group controlId="formLastName">
                                <Form.Label>Last name (Optional)</Form.Label>
                                <Form.Control type="text" placeholder="Last name"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                        </Form>
                    </Card.Body>
                    { props.user && props.user.loginError &&
                    <Alert variant="danger">
                        {props?.user?.loginErrorMessage?(JSON.parse(props?.user?.loginErrorMessage)?.error?.message):''}
                    </Alert>
                    }
                </Card>
                <br/>

            </div>

        );
    }
    else
        return <Redirect to={'/'}/>
}

export default connect((state) => ({
    user: state.user,
}))(SignIn);
