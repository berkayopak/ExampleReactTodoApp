import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {logout} from "../../actions/functions";
import {Nav, Navbar, Form, Button, Badge} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from '@fortawesome/free-solid-svg-icons'


function Header(props) {
    useEffect(() => {
    });

    function signOut(){
        props.dispatch(logout());
    }

    if(props.user.loggedIn) {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="#home">Todo List App</Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>
                        <Nav.Item>
                            <Nav.Link disabled>
                                <FontAwesomeIcon icon={faUser} style={{marginRight: '2px'}}/>
                                <span>{props.user.user.username}</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Button variant="outline-primary" onClick={signOut}>Logout</Button>
                        </Nav.Item>
                </Navbar>
            </div>
        );
    }
    else
        return null;
}

export default connect((state) => ({
    user: state.user,
}))(Header);
