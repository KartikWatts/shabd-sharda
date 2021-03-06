// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

let firebaseConfigEnv = process.env.REACT_APP_FIREBASE_CONFIG;

let firebaseConfig = {};

if (firebaseConfigEnv) {
  firebaseConfigEnv = firebaseConfigEnv.replace(/'/g, '"');
  let firebaseConfigJson = JSON.parse(firebaseConfigEnv);
  firebaseConfig = firebaseConfigJson;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
