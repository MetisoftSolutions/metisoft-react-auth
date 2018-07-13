# metisoft-react-auth

This library allows you to easily drop authentication (login/registration) functionality into a React app. There are a few different ways you can use it.

1. You can use the prefabricated front end UI. Just drop in the `<AuthWidget>` component, provide some configuration, and you have an auth system for your client.
2. You can use the UI that comes with this module (`<AuthWidget>`), but provide your own styles for it.
3. You can programmatically access the methods to log in and register with the server, allowing you to create an entirely custom front end UI.

## Installation

```
npm i https://github.com/MetisoftSolutions/metisoft-react-auth.git
```

TypeScript typings are included. Note that the examples in this readme assume TypeScript, though the module can be used with JavaScript as well.

## Usage

For all modes of usage, you need to initialize this module on app startup. This requires including Firebase in your app. Read more about setting up Firebase on the client [here](https://firebase.google.com/docs/web/setup).

1. Initialize Firebase. Ideally this is done in its own function.
  ```
  const firebase = require('firebase');
  const config = {
    apiKey: '<YOUR-API-KEY>',
    authDomain: '<YOUR-AUTH-DOMAIN>'
  };

  let firebaseApp;
  if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(config);
  } 
  ```
2. Pass the Firebase app object into the `init()` function for this module.
  ```
  import { service as auth } from 'metisoft-react-auth';

  auth.init(firebaseApp);
  ```

### Prefabricated UI

1. Import the `AuthWidget`.
  ```
  import { AuthWidget } from 'metisoft-react-auth';
  ```
2. You can now render the `AuthWidget` within one of your components. Supply `successRoute` with a React Router route to navigate to when the user is successfully logged in.
  ```
  export class PrefabActivityLogin extends React.Component<any, any> {
    // ...

    public render() {
      return (
        <AuthWidget
          successRoute="/auth/success" />
      );
    }
    
    // ...
  }
  ```

## UI with custom styles

1. Follow the same steps as in the **Prefabricated UI** section.
2. Import a CSS module with your custom styles. At a minimum, you must provide styles for the `auth-form` class and the `input-field` class. Pass the imported styles into the `styles` prop.
  ```
  const styles = require('./myStyles.css');

  // ...

  public render() {
    return (
      <AuthWidget
        styles={styles}
        successRoute="/auth/success" />
    );
  }
  ```

## Programmatic access (you provide your own UI)

1. Import `service`.
  ```
  import { service } from 'metisoft-react-auth';
  ```
2. Add a listener using `addLoginChangeListener()`. Whatever function you pass in will be called whenever the user's auth state changes. The function will receive either a `firebase.User` or `null`. The `firebase.User` will only be passed when the user is authenticated, and you can access details about the user from the object. If the user is not authenticated, `null` is received. `addLoginChangeListener()` returns a function you can call to unregister the listener you just added. The listener you pass in should be the primary mechanism of responding to login state changes (as opposed to return values from the various action functions like `logIn()` and `register()`).
  ```
  const unregisterListener = service.addLoginChangeListener((user: firebase.User | null) => {
    if (user !== null) {
      console.log("User is logged in!");
    } else {
      console.log("User is logged out!");
    }
  });

  // ... in some tear down routine:
  unregisterListener();
  ```
3. Call the provided functions to access the authentication functionality. Most functions return Bluebird Promises to indicate completion of asynchronous calls. Again, prefer your login change listener function for responding to auth state changes.
  ```
  // Example of calling login functionality
  service.logIn(email, password)
    .then((userCredential: firebase.auth.UserCredential) => {
      // user is logged in
    });
  ```

## Project creation information

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).