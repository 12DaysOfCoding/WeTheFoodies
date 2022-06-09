// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getDatabase,  ref, update } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';
import { 

  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
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
const loginBtn = document.getElementById('login');
const googleLoginBtn = document.getElementById('google-login');
const logoutBtn = document.createElement('button');
logoutBtn.innerHTML = 'Logout';
const emailLabel = document.createElement('label');
emailLabel.textContent = 'Email Address: ';
const sendInstructions = document.createElement('button');
sendInstructions.textContent = 'Send Instructions';



// TODO: Store the user to the database
googleLoginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(() => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      window.location.href = 'index.html';
    })
    
    .catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      alert(errorMessage);
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