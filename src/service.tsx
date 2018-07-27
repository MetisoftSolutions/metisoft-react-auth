import * as firebase from 'firebase';
import * as _ from 'lodash';



let __unregisterAuthObserver = () => {};
let __loggedInUser: firebase.User | null = null;
let __firebaseApp: firebase.app.App;

export function init(firebaseApp?: firebase.app.App) {
  if (!firebaseApp) {
    firebaseApp = firebase.app();
    if (!firebaseApp) {
      throw new Error("NO_FIREBASE_APP");
    }
  }
  __firebaseApp = firebaseApp;
  __loggedInUser = null;
  
  __unregisterAuthObserver = __firebaseApp.auth().onAuthStateChanged(
    (user: firebase.User | null) => {
      __loggedInUser = user;
      __onLoginChange(user);
    }
  );
}



export function logIn(email: string, password: string) {
  return Promise.resolve(__firebaseApp.auth().signInWithEmailAndPassword(email, password));
}



export function register(email: string, password: string) {
  return Promise.resolve(__firebaseApp.auth().createUserWithEmailAndPassword(email, password));
}



export function logOut() {
  return Promise.resolve(__firebaseApp.auth().signOut());
}



export type FnListener = (user: firebase.User | null) => void;
const listeners: FnListener[] = [];

function __onLoginChange(user: firebase.User | null) {
  _.forEach(listeners, (listener: FnListener) => {
    if (listener) {
      listener(user);
    }
  });
}



export type FnUnregisterListener = () => void;

export function addLoginChangeListener(listener: FnListener): FnUnregisterListener {
  listeners.push(listener);
  listener(__loggedInUser);

  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}



export function shutDown() {
  __unregisterAuthObserver();
}



export function isLoggedIn() {
  return !!__loggedInUser;
}



export function getLoggedInUser() {
  return __loggedInUser;
}
