// index.js
/** @module index */

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize and call other functions
 */
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

/**
 * Click to go to dashboard
 */
function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace('index.html');
  });
}

/**
 * Click to go to search page
 */
function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-searchPage.html');
  });
}

/**
 * Click to add recipe 
 */
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-add.html');
  });
}

/**
 * Click to go to settings
 */
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace('settings.html');
  });
}