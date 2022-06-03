import {auth} from './auth.js';

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
