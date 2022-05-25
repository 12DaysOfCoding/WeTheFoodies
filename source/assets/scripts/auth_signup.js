// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getDatabase, set, ref, update } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
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

// DOM elements
// TODO: Change below elements to correct elements. 
const headerContainer = document.getElementById('header-container');
const btnContainer = document.getElementById('btn-container');
const inputEmail = document.getElementById('email');
const inputPass = document.getElementById('password');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const googleLoginBtn = document.getElementById('google-login');
const logoutBtn = document.createElement('button');
const forgotPass = document.getElementById('forgot-password');
const welcome = document.createElement('h2');
const headerLoginPage = document.getElementById('form-header');
logoutBtn.innerHTML = 'Logout';
const emailLabel = document.createElement('label');
emailLabel.textContent = 'Email Address: ';
const emailForgotPass = document.createElement('input');
const sendInstructions = document.createElement('button');
sendInstructions.textContent = 'Send Instructions';

registerBtn.addEventListener('click', () => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  console.log('Register button clicked');

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Registered 
      const user = userCredential.user;
      set(ref(db, 'users/' + user.uid), {
      })
        .then(() => {
          // TODO: Go to onboarding page. 
          alert('User created!');
          window.location.href = 'onBoardingPage.html';
        });
    })


    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });

});

