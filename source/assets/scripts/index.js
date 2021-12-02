// index.js
/** @module index */

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize and call other functions
 */
async function init() {
  // Create a recipe card with mock data
  let recipeCard = document.createElement('recipe-card');
  recipeCard.data = {};
  document.querySelector('.saved-recipes__wrapper').appendChild(recipeCard);
}