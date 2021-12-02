// settings.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goPreferenceSetting();
  goVersion();
}

function goVersion(){
  const prefClass = document.getElementsByClassName('version')[0];
  const imgBtn = prefClass.getElementsByTagName('p')[1];
  imgBtn.addEventListener('click', () => {
    window.location.replace('version.html');
  });
}

function goPreferenceSetting() {
  const prefClass = document.getElementsByClassName('preference')[0];
  const imgBtn = prefClass.getElementsByTagName('p')[1];
  imgBtn.addEventListener('click', () => {
    window.location.replace('preference-setting.html');
  });
}