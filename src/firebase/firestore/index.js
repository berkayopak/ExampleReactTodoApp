import firebase from '../../firebase';

const db = firebase.firestore();

export function getAllTodoItems(user) {
    return new Promise(function (resolve, reject) {
        const todosCollection = db.collection('todos');
        let todoList = [];

        todosCollection.where("username","==", user.username).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let todoItem = doc.data();
                todoItem.id = doc.id;
                todoList.push(todoItem);
            });
            resolve(todoList)
        });
    });
}

export function addTodoItemToCollection(todo, user) {
    return new Promise(function (resolve, reject) {
        const todoItem = {
            description: todo.description,
            uid: user.id,
            username: user.username
        };
        const todosCollection = db.collection('todos');

        todosCollection.add(todoItem).then(function (res) {
            resolve(res);
        }).catch(function (err) {
            reject(err);
        })
    });
}

export function editTodoItemFromCollection(todo, user) {
    return new Promise(function (resolve, reject) {
        const todosCollection = db.collection('todos');

        const updateResult = todosCollection.doc(todo.id).update({
            description: todo.description
        }).then(function () {
            resolve(true);
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function deleteTodoItemFromCollection(todo) {
    return new Promise(function (resolve, reject) {
        const todosCollection = db.collection('todos');
        todosCollection.doc(todo.id).delete().then(function() {
            resolve(true);
        }).catch(function(err) {
            reject(err);
        });
    });
}