/** @module recipe-detail */

import * as backend from './backend.js';
import * as database from './database.js';

if (localStorage.getItem('%not_first_visit'))
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect


/**
 * Initialize and call other function
 */
async function init() {
  const selected = backend.get_selected();
  if (selected === '') {
    window.location.assign('index.html');
    return;
  }

  const recipe = backend.get_recipe(selected);

  // Create a recipe card with mock data
  let expandedRecipeCard = document.createElement('expanded-recipe-card');
  expandedRecipeCard.data = recipe;
  document.querySelector('.recipe-detail__wrapper').appendChild(expandedRecipeCard);

  saveOrSaved(recipe);
  populateUI(recipe);
  bindFoodieButton();
  bindEditButton();
  bindDeleteButton(recipe.hash);
  goBack();
}

function populateUI(recipe) {
  // console.log(recipe);
  document.getElementById('cooking-time-input').textContent = `${recipe.readyInMinutes} mins`;
  document.getElementById('serving-size-input').textContent = `${recipe.servings} servings`;

  const ingredientsWrapper = document.querySelector('.specific-ingredients');
  if (recipe.ingredients)   // guard for no ingredients
    recipe.ingredients.forEach(function (ingredient) {
      const ingredientElem = document.createElement('div');
      const check_box = document.createElement('input');
      check_box.type = 'checkbox';
      ingredientElem.appendChild(check_box);
      const text = document.createElement('span');
      text.innerText = ingredient.original;
      ingredientElem.appendChild(text);
      ingredientsWrapper.appendChild(ingredientElem);
    });


  const stepsWrapper = document.querySelector('.specific-instructions');
  if (recipe.steps)   // guard for no steps
    recipe.steps.forEach(function (step) {
      const stepElem = document.createElement('li');
      stepElem.textContent = `${step.step}`;
      stepsWrapper.appendChild(stepElem);
    });

  if (recipe.steps.length === 0) {
    const instructionsList = document.querySelector('.instructions');
    const foodieInstruction = document.getElementById('how-to-use-foodie');
    const foodieBtn = document.getElementById('foodie-mode');
    instructionsList.classList.add('hidden');
    foodieInstruction.classList.add('hidden');
    foodieBtn.classList.remove('show-foodie-mode');
    foodieBtn.classList.add('hidden');
  }
}

/**
 * Click to change to save or saved
 */
function saveOrSaved(recipe) {
  const btn = document.querySelector('.save');
  const heart = document.getElementById('heart');
  const text = document.getElementById('save-or-not');

  if (backend.get_favorite().includes(recipe.hash)) {
    text.textContent = 'SAVED';
    heart.src = 'assets/images/heart1.svg';
  }

  btn.addEventListener('click', () => {
    if (text.textContent === 'SAVE') {
      text.textContent = 'SAVED';
      heart.src = 'assets/images/heart1.svg';
      backend.add_favorite(recipe.hash);
      database.add_favorite(recipe.name);

    } else {
      text.textContent = 'SAVE';
      heart.src = 'assets/images/heart0.svg';
      backend.remove_favorite(recipe.hash);
      database.delete_favorite_recipe(recipe.hash);
    }
  });
}

function bindFoodieButton() {
  const foodieBtn = document.getElementById('foodie-mode');
  foodieBtn.addEventListener('click', () => {
    window.location.assign('foodie.html');
  });
}

function bindEditButton() {
  const foodieBtn = document.getElementById('edit');
  foodieBtn.addEventListener('click', () => {
    window.location.assign('recipe-edit.html');
  });
}

function bindDeleteButton(recipe_hash) {
  const foodieBtn = document.getElementById('delete');
  foodieBtn.addEventListener('click', () => {

    let text = 'Do you want to delete the recipe?';
    if (confirm(text) === true) {
      // Check if recipe is in the custom recipes list
      var customList = backend.get_custom();
      backend.remove_recipe(recipe_hash);
      if (customList.includes(recipe_hash)) {
        database.delete_user_recipe(recipe_hash).then(() => {
          window.location.assign('index.html');
        });

      } else {
        database.delete_favorite_recipe(recipe_hash).then(() => {
          window.location.assign('index.html');
        });
      }
    }
  });
}

function goBack() {
  const btn = document.getElementById('white-arrow-p');
  let index = document.referrer.lastIndexOf('/');
  let str = document.referrer.substring(index + 1);

  btn.addEventListener('click', () => {
    if (str === 'recipe-search.html')
      window.history.back();
    else
      window.location.assign('index.html');

  });
}
