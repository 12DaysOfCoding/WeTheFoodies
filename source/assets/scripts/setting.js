// settings.js

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getDatabase, set, ref, update } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  sendEmailVerification,
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
const provider = new GoogleAuthProvider();

if (localStorage.getItem('%not_first_visit')) 
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect


async function init() {
  goPreferenceSetting();
  goVersion();
  goLogOutSetting();
}

function goVersion(){
  const prefClass = document.getElementsByClassName('version')[0];
  prefClass.addEventListener('click', () => {
    window.location.assign('version.html');
  });
}

function goPreferenceSetting() {
  const prefClass = document.getElementsByClassName('preference')[0];
  prefClass.addEventListener('click', () => {
    window.location.assign('preference-setting.html');
  });
}

function goLogOutSetting() {
  const prefClass = document.getElementsByClassName('logout')[0];
  prefClass.addEventListener('click', () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      alert("You've been logged out");
      //Go to login page
      window.location.assign('login.html');
  })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
    
  });
}
