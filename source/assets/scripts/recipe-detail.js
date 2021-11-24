// recipe-detail.js

window.addEventListener('DOMContentLoaded', init);



/**
 * Initialize and call others function
 */
async function init() {

  // Create a recipe card with mock data
  let expandedRecipeCard = document.createElement('expanded-recipe-card');
  expandedRecipeCard.data = {};
  document.querySelector('.recipe-detail__wrapper').appendChild(expandedRecipeCard);

  saveOrSaved();
  goDashboard();
  goSearch();
  goAdd();
  goSettings();
}

/**
 * Click to change to save or saved
 */
function saveOrSaved() {
  const btn = document.querySelector('.save');
  const heart = document.getElementById('heart');
  const text = document.getElementById('save-or-not');

  btn.addEventListener('click', () => {
    if (text.textContent === 'SAVE') {
      text.textContent = 'SAVED';
      heart.src = 'assets/images/heart1.svg';
    } else {
      text.textContent = 'SAVE';
      heart.src = 'assets/images/heart0.svg';
    }
  });
}

/**
 * Click to go back to dashboard
 */
function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace("index.html");
  });
}


/**
 * Click to go to search
 */
function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace("recipe-searchPage.html");
  });
}

/**
 * Click to add the recipe card
 */
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace("recipe-add.html");
  });
}

/**
 * Click to go to settings
 */
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace("settings.html");
  });
}