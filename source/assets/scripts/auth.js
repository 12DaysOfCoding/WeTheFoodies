// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';
import keys from '../../../keys.json' 
import {
  getAuth
} from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// TODO: Integrate API keys to CI/CD Pipeline
const firebaseConfig = {
  apiKey: keys.FIREBASE_API_KEY,
  authDomain: 'wethefoodies-329cf.firebaseapp.com',
  projectId: 'wethefoodies-329cf',
  storageBucket: 'wethefoodies-329cf.appspot.com',
  messagingSenderId: '560754808557',
  appId: '1:560754808557:web:c6922900dad39cfafa1ee4',
  measurementId: 'G-5J4GYWY5VS'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
