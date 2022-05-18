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

function renderButton() {
  gapi.signin2.render('google-login', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

// TODO: Store the user to the database
googleLoginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const dt = new Date();
      console.log('trying to loggin');

      
      // TODO: Store the user data to the database.
      if(!user) 
        set(ref(db, 'users/' + user.uid), {
          user: user,
          last_login: dt,
        }).then(() =>{
          alert('User Google Created!');
        });
      else 
        update(ref(db, 'users/' + user.uid),{
          user: user,
          last_login: dt,
        }).then(() =>{
          alert('User Google Logged in!');
        });

      alert('User Logging in!');
      console.log('successful');
      // TODO: Go to onboarding page.
      window.location.href = 'index.html';
      // location.href = "index.html";
      
      
    })
    
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
      console.log(errorMessage);

    });
});

loginBtn.addEventListener('click', () => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const dt = new Date();
      update(ref(db, 'users/' + user.uid),{
        email: email,
        last_login: dt,
      });

      alert('User logged in!');
      window.location.href = 'index.html';
      // location.href = "index.html";
      console.log('successful');

      //TODO: Go to dashboard
      // welcome.innerHTML = `Welcome ${email}`;
      // inputEmail.style.display = 'none';
      // inputPass.style.display = 'none';
      // loginBtn.style.display = 'none';
      // registerBtn.style.display = 'none';
      // headerContainer.appendChild(welcome);
      // btnContainer.appendChild(logoutBtn);

    })

    .catch((error) => {
      const errorMessage = error.message;

      alert(errorMessage);
    });
});