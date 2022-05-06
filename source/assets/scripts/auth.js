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
  sendSignInLinkToEmail,
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

registerBtn.addEventListener('click', () => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Registered 
      const user = userCredential.user;
      set(ref(db, 'users/' + user.uid), {
        email: email,
        password: password
      })
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              alert('Verification sent!');
            });

          // TODO: Go to onboarding page. 
          alert('User created!');
        });
    })

    .catch((error) => {
      const errorMessage = error.message;
      alert('Email already in used!');
    });
});

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
      
      // TODO: Store the user data to the database.
      // if(!user) 
      //   set(ref(db, 'users/' + user.uid), {
      //     user: user,
      //     last_login: dt,
      //   }).then(() =>{
      //     alert('User Google Created!');
      //   });
      // else 
      //   update(ref(db, 'users/' + user.uid),{
      //     user: user,
      //     last_login: dt,
      //   }).then(() =>{
      //     alert('User Google Logged in!');
      //   });

      alert('User Logging in!');
      // TODO: Go to onboarding page.
      
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

      alert('User loged in!');

      //TODO: Go to dashboard
      welcome.innerHTML = `Welcome ${email}`;
      inputEmail.style.display = 'none';
      inputPass.style.display = 'none';
      loginBtn.style.display = 'none';
      registerBtn.style.display = 'none';
      headerContainer.appendChild(welcome);
      btnContainer.appendChild(logoutBtn);
    })

    .catch((error) => {
      const errorMessage = error.message;

      alert(errorMessage);
    });
});

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