import firebase from '../../firebase';

export function signInAnonymously() {
    return new Promise(function (resolve, reject) {
        firebase.auth().signInAnonymously().then(function (result) {
            resolve(result);
        }).catch(function (error) {
            reject(error);
        });
    });
}