// settings.js

if (localStorage.getItem('%not_first_visit')) 
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect


async function init() {
  goPreferenceSetting();
  goVersion();
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
