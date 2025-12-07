import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn0Ag_zOHIPDE4RzP431XBodKBufhO2uQ",
  authDomain: "deepsolv-81bf7.firebaseapp.com",
  projectId: "deepsolv-81bf7",
  storageBucket: "deepsolv-81bf7.firebasestorage.app",
  messagingSenderId: "292959783612",
  appId: "1:292959783612:web:5fe420d49a30fb5cd39eb9",
  measurementId: "G-KW0T2STD4M"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
