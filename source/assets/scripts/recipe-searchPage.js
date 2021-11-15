// recipe-searchPage.js

window.addEventListener('DOMContentLoaded', init)
  
async function init() {

  // Create a recipe card with mock data
  let recipeCard = document.createElement('recipe-card');
  recipeCard.data = {};
  document.querySelector('.recipes__wrapper').appendChild(recipeCard);
  
  let recipeCard2 = document.createElement('recipe-card');
  recipeCard2.data = {};
  document.querySelector('.recipes__wrapper').appendChild(recipeCard2);

  // let recipeCard3 = document.createElement('recipe-card');
  // recipeCard3.data = {};
  // document.querySelector('.recipes__wrapper').appendChild(recipeCard3);

  // let recipeCard4 = document.createElement('recipe-card');
  // recipeCard4.data = {};
  // document.querySelector('.recipes__wrappers').appendChild(recipeCard4);

}
  