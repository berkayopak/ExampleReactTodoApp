import firebase from '../../firebase';

const db = firebase.firestore();

const collectionName = 'todo';
const filterByFieldPath = 'username';
const orderByFieldPath = 'createdAt';
const orderByDirectionStr = 'asc';

export function getAllTodoItems(user) {
    return new Promise(function (resolve, reject) {
        const todosCollection = db.collection(collectionName);
        let todoList = [];

        todosCollection.where(filterByFieldPath,"==", user.username).orderBy(orderByFieldPath, orderByDirectionStr).get().then(function (querySnapshot) {
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
        const currentTimestamp = firebase.firestore.FieldValue.serverTimestamp();
        const todoItem = {
            description: todo.description,
            uid: user.id,
            username: user.username,
            createdAt: currentTimestamp,
            modifiedAt: currentTimestamp
        };
        const todosCollection = db.collection(collectionName);

        todosCollection.add(todoItem).then(function (res) {
            resolve(res);
        }).catch(function (err) {
            reject(err);
        })
    });
}

export function editTodoItemFromCollection(todo, user) {
    return new Promise(function (resolve, reject) {
        const todosCollection = db.collection(collectionName);

        const updateResult = todosCollection.doc(todo.id).update({
            description: todo.description,
            modifiedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function () {
            resolve(true);
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function deleteTodoItemFromCollection(todo) {
    return new Promise(function (resolve, reject) {
        const todosCollection = db.collection(collectionName);
        todosCollection.doc(todo.id).delete().then(function() {
            resolve(true);
        }).catch(function(err) {
            reject(err);
        });
    });
}