// index.js
/** @module index */

import * as backend from './backend.js';

if (localStorage.getItem('%not_first_visit')) 
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect


/**
 * Initialize and call other functions
 */
async function init() {
  renderSavedRecipes();
  renderCustomRecipes();
}

function renderSavedRecipes() {
  const favorites = backend.get_favorite();
  if (favorites.length !== 0) document.querySelector('.saved-recipes__wrapper').innerHTML = '';
  favorites.forEach(function(recipeHash) {
    const recipe = backend.get_recipe(recipeHash);
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    document.querySelector('.saved-recipes__wrapper').appendChild(recipeCard);

    recipeCard.addEventListener('click', () => {
      backend.select_recipe(recipe.hash);
      window.location.assign('recipe-detail.html');
    });
  });
}

function renderCustomRecipes() {
  const customRecipes = backend.get_custom();
  if (customRecipes.length !== 0) document.querySelector('.my-recipes__wrapper').innerHTML = '';
  customRecipes.forEach(function(recipeHash) {
    const recipe = backend.get_recipe(recipeHash);
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    document.querySelector('.my-recipes__wrapper').appendChild(recipeCard);

    recipeCard.addEventListener('click', () => {
      backend.select_recipe(recipe.hash);
      window.location.assign('recipe-detail.html');
    });
  });
}