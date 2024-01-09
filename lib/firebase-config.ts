// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd9I9NnT4o36mdoOSsUBKWx3rw2O5OxnU",
  authDomain: "fir-auth-36404.firebaseapp.com",
  projectId: "fir-auth-36404",
  storageBucket: "fir-auth-36404.appspot.com",
  messagingSenderId: "105739784215",
  appId: "1:105739784215:web:c94f67dfcf9f88f99f0c52",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

export { app, auth, GoogleProvider, GithubProvider };
