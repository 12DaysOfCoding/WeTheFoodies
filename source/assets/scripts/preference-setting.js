// preference-setting.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goBack();
  saveOrSaved();
  goDashboard();
  goSearch();
  goAdd();
  goSettings();
}

function saveOrSaved() {
  const btn = document.querySelector('.save');
  const heart = document.getElementById('heart');
  const text = document.getElementById('save-or-not');

  btn.addEventListener('click', () => {
    if (text.textContent === 'SAVE') {
      text.textContent = 'SAVED';
      heart.src = 'assets/images/white-border-heart2.svg';
    } else {
      text.textContent = 'SAVE';
      heart.src = 'assets/images/white-border-heart.svg';
    }
  });
}

function goBack(){
  const btn = document.getElementById('dount');

  btn.addEventListener('click', () => {
    window.location.replace('settings.html');
  });
}

function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace('index.html');
  });
}

function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-searchPage.html');
  });
}
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace('#');
  });
}
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace('settings.html');
  });
}