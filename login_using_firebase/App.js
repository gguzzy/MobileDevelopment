/*program created by Gianluca Guzzetta, using Firebase console and React Native
for further looks of working material, please refer to the main link on github*/
import React, { Component, useState, useEffect} from 'react';
//import {createStackNavigator} from 'react-navigation-stack';
import {
  FlatList,
  Text,
  View,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';
import { Platform, StyleSheet} from 'react-native';
import styles from './styles';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

const userData = {
  name: 'Jane',
  surname: 'Doe',
  address: 'Stree 15 avenue',
  phone: '323133442',
  email: 'jane.doe@example.com',
  password: 'SuperSecretPassword!',
}

createUser = () => {
  auth()
  .createUserWithEmailAndPassword(userData.email, userData.password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
};

logoff = () => {
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}
login = () => {
  auth()
  .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  .then(() => console.log('User signed in!'));
}

connectHomeScreenAfterLogin = () => {
  this.login();
  //his.AppContainer();
}

const LoginApp = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
      <Text>Accedi per acquistare o iscriviti per iniziare!</Text>
      <Button title='Create User' onPress={this.createUser}></Button>
      <Button title='Login' onPress={this.login}></Button>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.loginTitle}>Bentornato {user.email}</Text>
      <Text style={styles.loginTitle}>Account di: {userData.name}</Text>
      <Button title='Premi per iniziare'/>
      <Button title='Logoff' onPress={this.logoff}></Button>
    </View>
  );
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

const firebaseCredentials = Platform.select({
  ios: 'https://invertase.link/firebase-ios',
  android: 'https://invertase.link/firebase-android',
});

// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const ProfileScreen = () => {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./svevia_logo.jpg')}/>
        <Text style={styles.title}> Benvenuto su "login base usando Firebase"</Text>
        <LoginApp/>
        {!firebase.apps.length && (
          <Text style={styles.instructions}>
            {`\nYou currently have no Firebase apps registered, this most likely means you've not downloaded your project credentials. Visit the link below to learn more. \n\n ${firebaseCredentials}`}
          </Text>
        )}
      </View>
    );
}

export default App;