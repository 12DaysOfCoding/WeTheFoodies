// preference-setting.js
import * as backend from './backend.js';

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goBack();

  goDashboard();
  goSearch();
  goAdd();
  goSettings();

  defaultPreference();
  saveOrSaved();
}

//helper function
function changePreference(){
  const leftElmt = document.querySelector('.left');
  const leftCkbox = leftElmt.getElementsByClassName('container');
  let intolerance_list = [];

  //leftCkbox[0].getElementsByTagName("input")[0].checked

  for(let i = 0; i < leftCkbox.length; i++){
    let ingredientBox = leftCkbox[i].getElementsByTagName('input')[0];
    if(ingredientBox.checked){
      let ingredientText = leftCkbox[i].innerText;
      intolerance_list.push(ingredientText);
    }
  }

  const rightElmt = document.querySelector('.right');
  const rightCkbox = rightElmt.getElementsByClassName('container');
  for(let i = 0; i < rightCkbox.length; i++){
    let ingredientBox = rightCkbox[i].getElementsByTagName('input')[0];
    if(ingredientBox.checked){
      let ingredientText = rightCkbox[i].innerText;
      intolerance_list.push(ingredientText);
    }
  }

  backend.set_intolerance(intolerance_list);
}

function defaultPreference(){
  let intolerance_list = backend.get_intolerance();

  const leftElmt = document.querySelector('.left');
  const leftCkbox = leftElmt.getElementsByClassName('container');
  for(let i = 0; i < leftCkbox.length; i++){
    let ingredientBox = leftCkbox[i].getElementsByTagName('input')[0];
    let ingredientText = leftCkbox[i].innerText;

    if(intolerance_list.includes(ingredientText))
      ingredientBox.checked = true;
    
  }

  const rightElmt = document.querySelector('.right');
  const rightCkbox = rightElmt.getElementsByClassName('container');
  for(let i = 0; i < rightCkbox.length; i++){
    let ingredientBox = rightCkbox[i].getElementsByTagName('input')[0];
    let ingredientText = rightCkbox[i].innerText;

    if(intolerance_list.includes(ingredientText))
      ingredientBox.checked = true;
    
  }

}



function saveOrSaved() {
  const btn = document.querySelector('.save');
  const heart = document.getElementById('heart');
  const text = document.getElementById('save-or-not');

  btn.addEventListener('click', () => {
    if (text.textContent === 'SAVE') {
      changePreference();
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
    window.location.replace('recipe-search.html');
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