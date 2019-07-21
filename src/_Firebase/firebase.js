import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAouS86UqGvZiWEIX48N9X8XZz4I1vydzU",
  authDomain: "my-time-buddy-d4f54.firebaseapp.com",
  databaseURL: "https://my-time-buddy-d4f54.firebaseio.com",
  projectId: "my-time-buddy-d4f54",
  storageBucket: "",
  messagingSenderId: "519572486542",
  appId: "1:519572486542:web:9c4ef25804b95ec1"
};

// Initialize and Export Firebase
export const fireDB = firebase.initializeApp(firebaseConfig);

// Create User
export const createUser = (email, password) => {
  fireDB.auth().createUserWithEmailAndPassword(email, password)
.then( () => console.log('Success') )
.catch( error => console.log(error) )
}

// Login User
export const loginUser = (email, password) => {
  fireDB.auth().signInWithEmailAndPassword(email, password)
  .then( ( singnedInUser ) => console.log(singnedInUser, 'Logged In') )
  .catch( error => console.log(error) )
}
