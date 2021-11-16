// index.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goDashboard();
  goSearch();
  goAdd();
  goSettings();


  // Create a recipe card with mock data
  let recipeCard = document.createElement('recipe-card');
  recipeCard.data = {};
  document.querySelector('.saved-recipes__wrapper').appendChild(recipeCard);

}

function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace("index.html");
  });
}

function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace("recipe-searchPage.html");
  });
}
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace("#");
  });
}
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace("#");
  });
}