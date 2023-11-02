//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyC1P5yY54eZ2hk3IcH-tjOEX_UlfJg4hsI",
  authDomain: "bby-36.firebaseapp.com",
  projectId: "bby-36",
  storageBucket: "bby-36.appspot.com",
  messagingSenderId: "329833196454",
  appId: "1:329833196454:web:ab979543767b4e50363d67"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const user = firebase.auth().currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getIdToken() instead.
  const uid = user.uid;
}