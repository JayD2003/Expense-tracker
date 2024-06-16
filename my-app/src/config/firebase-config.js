// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth ,GoogleAuthProvider} from  'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdiqISEqgNO2B79OhdBpIQSs_L9NE_6u4",
  authDomain: "expense-tracker-dab29.firebaseapp.com",
  projectId: "expense-tracker-dab29",
  storageBucket: "expense-tracker-dab29.appspot.com",
  messagingSenderId: "335068700197",
  appId: "1:335068700197:web:bdf04f4f60ff33622c29cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// firebase login
// firebase init
// firebase deploy
 