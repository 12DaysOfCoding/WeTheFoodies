import {auth} from './auth.js';
import { 
  signOut 
} from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js';
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
      alert('You\'ve been logged out');
      
      // Clear all the previous user's data, except for it being the first visit
      localStorage.clear();
      localStorage.setItem('%not_first_visit', 'true');
      localStorage.setItem('%doneTourAddPage', 'yeah!');
      localStorage.setItem('%doneTour', 'yeah!');
      localStorage.setItem('%doneTourSearchPage', 'yeah!');

      //Go to login page
      window.location.assign('login.html');

    })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
    
  });
}
