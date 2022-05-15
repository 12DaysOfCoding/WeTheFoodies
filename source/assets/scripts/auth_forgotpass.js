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

// TODO: Go to the forgot password page.
forgotPass.addEventListener('click', () => {
  headerContainer.appendChild(emailLabel);
  headerContainer.appendChild(emailForgotPass);
  btnContainer.appendChild(sendInstructions);

  inputEmail.style.display = 'none';
  inputPass.style.display = 'none';
  loginBtn.style.display = 'none';
  registerBtn.style.display = 'none';
  googleLoginBtn.style.display = 'none';
  forgotPass.style.display = 'none';
});

sendInstructions.addEventListener('click', () => {
  var email = document.getElementById('email').value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert('Password reset email sent!');
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Email is wrong! Please try again!');
    });
});

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert('User loged out');

    //TODO: Go to login page
    inputEmail.style.display = 'block';
    inputPass.style.display = 'block';
    loginBtn.style.display = '';
    registerBtn.style.display = '';
    headerLoginPage.style.display = 'block';
    welcome.remove();
    logoutBtn.remove();
    btnContainer.append(registerBtn);
    btnContainer.append(loginBtn);
  })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});