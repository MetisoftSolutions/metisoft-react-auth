"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const firebase = require("firebase/app");
let __unregisterAuthObserver = () => { };
let __loggedInUser = 'NO_LOGIN_ATTEMPT_YET';
let __firebaseApp;
function init(firebaseApp) {
    if (!firebaseApp) {
        firebaseApp = firebase.app();
        if (!firebaseApp) {
            throw new Error("NO_FIREBASE_APP");
        }
    }
    __firebaseApp = firebaseApp;
    __unregisterAuthObserver = __firebaseApp.auth().onAuthStateChanged((user) => {
        __loggedInUser = user;
        __onLoginChange(user);
    });
}
exports.init = init;
function logIn(email, password) {
    return Promise.resolve(__firebaseApp.auth().signInWithEmailAndPassword(email, password));
}
exports.logIn = logIn;
function register(email, password) {
    return Promise.resolve(__firebaseApp.auth().createUserWithEmailAndPassword(email, password));
}
exports.register = register;
function logOut() {
    return Promise.resolve(__firebaseApp.auth().signOut());
}
exports.logOut = logOut;
function sendEmailVerification(user) {
    return Promise.resolve(user.sendEmailVerification());
}
exports.sendEmailVerification = sendEmailVerification;
function sendPasswordResetEmail(email) {
    return Promise.resolve(__firebaseApp.auth().sendPasswordResetEmail(email));
}
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const listeners = [];
function __onLoginChange(user) {
    _.forEach(listeners, (listener) => {
        if (listener) {
            listener(user);
        }
    });
}
function addLoginChangeListener(listener) {
    listeners.push(listener);
    listener(__loggedInUser);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
}
exports.addLoginChangeListener = addLoginChangeListener;
function shutDown() {
    __unregisterAuthObserver();
}
exports.shutDown = shutDown;
function isLoggedIn() {
    return !!__loggedInUser;
}
exports.isLoggedIn = isLoggedIn;
function getLoggedInUser() {
    return __loggedInUser;
}
exports.getLoggedInUser = getLoggedInUser;
//# sourceMappingURL=service.js.map