// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';
import { 
  getAuth, 
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// TODO: Integrate API keys to CI/CD Pipeline
const firebaseConfig = {
  apiKey: 'AIzaSyBVqGsU9giK0GDQI7OOchNseJzMtn7uDuc',
  authDomain: 'wethefoodies-329cf.firebaseapp.com',
  projectId: 'wethefoodies-329cf',
  storageBucket: 'wethefoodies-329cf.appspot.com',
  messagingSenderId: '560754808557',
  appId: '1:560754808557:web:c6922900dad39cfafa1ee4',
  measurementId: 'G-5J4GYWY5VS'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

// DOM elements
const logoutBtn = document.createElement('button');
logoutBtn.innerHTML = 'Logout';
const emailLabel = document.createElement('label');
emailLabel.textContent = 'Email Address: ';
const sendInstructions = document.getElementById('send-instructions');

sendInstructions.addEventListener('click', () => {
  var email = document.getElementById('email').value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert('Password reset email sent!');
    })

    .catch(() => {
      alert('Email is wrong! Please try again!');
    });
});