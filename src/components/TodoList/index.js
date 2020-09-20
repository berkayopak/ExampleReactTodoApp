import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Alert, Button, Col, Form, Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {addTodo, deleteTodo, editTodo, loadTodoList, syncIdle} from "../../actions/functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faCheck} from '@fortawesome/free-solid-svg-icons'
import {syncStates} from "../../enums";
import './todoList.scss';


function TodoList(props) {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        if(props.todo.syncStatus === syncStates.SYNCED){
            setTimeout(function() {
                props.dispatch(syncIdle());
            }, 1000)
        }
    }, [props.todo.syncStatus]);

    useEffect(() => {
        props.dispatch(loadTodoList(props.user.user))
    }, []);

    useEffect(() => {
        if (props.todo && props.todo.todoList) {
            setTodoList(props.todo.todoList)
        }
    }, [props.todo]);

    function addTodoItem(e) {
        e.preventDefault();
        const newTodoItem = {
            description: e.target.elements.formTodo.value
        };
        props.dispatch(addTodo(newTodoItem, props.user.user));
        e.target.elements.formTodo.value = '';
    }

    function editTodoItem(todoItemId) {
        const editedItem = todoList.filter(item => item.id === todoItemId)[0];
        props.dispatch(editTodo(editedItem));
    }

    function deleteTodoItem(todoItemId) {
        const deletedItem = todoList.filter(item => item.id === todoItemId)[0];
        props.dispatch(deleteTodo(deletedItem));
    }

    function handleChange(event, todoItemId) {
        const newTodoList = todoList.map((item) => {
            if (item.id === todoItemId) {
                return {
                    ...item,
                    description: event.target.value,
                };
            }

            return item;
        });
        setTodoList(newTodoList);
    }

    function onSubmit(e, todoItemId) {
        e.preventDefault();
        editTodoItem(todoItemId);
    }

    return (
        <div className="container my-5">
            <Form onSubmit={addTodoItem}>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formTodo">
                            <Form.Control type="text" placeholder="Type a task" required pattern="\S(.*\S)?" disabled={props.todo.isLoading || props.todo.hasError}/>
                        </Form.Group>
                    </Col>
                </Form.Row>
            </Form>
            <br/>
            <h1>Todo List</h1>
            <br/>
            {props.todo.isLoading &&
            <div>
                <Spinner animation="border" variant="primary" />
            </div>
            }
            { !props.todo.isLoading && props.todo.hasError &&
                <Alert variant="danger">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        {props.todo.errorMessage}
                    </p>
                </Alert>
            }
            {!props.todo.isLoading && !props.todo.hasError && props.todo.todoList.length <= 0 && todoList &&
            <Alert variant="primary">
                <Alert.Heading>No content</Alert.Heading>
                <p>
                    We couldn't find any 'to-do' item registered for the username you logged in with. You can enter a new todo/task from the field above.
                </p>
                <p>

                </p>
                <hr />
                <p className="mb-0">
                    P.S : Press enter after you type a task for save/sync it!
                </p>
            </Alert>
            }
            { !props.todo.isLoading && !props.todo.hasError && props.todo.todoList.length > 0 && todoList &&
                <div>
                    {todoList.map((todoItem, key) => {
                        return (
                            <Form key={todoItem.id} onSubmit={(e) => onSubmit(e, todoItem.id)}>
                            <Form.Row>
                                <Col xs={10} md={11}>
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Type a task" required pattern="\S(.*\S)?"
                                                      value={todoItem.description} onChange={(event) => handleChange(event, todoItem.id)}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={1}>
                                    <Form.Group>
                                        <Button variant="danger"
                                                onClick={() => deleteTodoItem(todoItem.id)}><FontAwesomeIcon
                                            icon={faTrashAlt}/></Button>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                                <Button type="submit" id="submitButton" style={{display: 'none'}}/>
                            </Form>
                        );
                    })
                    }
                </div>

            }
            {props.todo.syncStatus === syncStates.SYNCING &&
            <div className="fixed-notifications">
                <Alert variant="primary">
                    <Alert.Heading>SYNCING...</Alert.Heading>
                    <span className="syncing-spinner">
                        <Spinner animation="border" variant="primary" className="mx-2" />
                    </span>
                </Alert>
            </div>
            }
            { props.todo.syncStatus === syncStates.SYNCED &&
                <div className="fixed-notifications">
                    <Alert variant="success">
                        <Alert.Heading>SYNCED!</Alert.Heading>
                        <span style={{fontSize: '3em', color: 'Dodgerblue'}}>
                            <FontAwesomeIcon
                        icon={faCheck}/>
                    </span>
                    </Alert>
                </div>
            }
            { props.todo.syncStatus === syncStates.ERROR &&
                <div className="fixed-notifications">
                    <Alert variant="danger" onClose={() => props.dispatch(syncIdle())} dismissible>
                        <Alert.Heading>Oh snap! You got a sync error!</Alert.Heading>
                        <p>
                            {props.todo.syncErrorMessage}
                        </p>
                    </Alert>
                </div>
            }


        </div>
    );
}

export default connect((state) => ({
    todo: state.todo,
    user: state.user
}))(TodoList);
