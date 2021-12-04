// settings.js

window.addEventListener('DOMContentLoaded', init);

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
