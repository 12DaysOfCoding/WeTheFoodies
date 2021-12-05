// recipe-searchPage.js

import * as backend from './backend.js';

window.addEventListener('DOMContentLoaded', init);

let current_recipes = [];

async function init() {
  defaultPreference();
  readPreference();

  bindSearchBar();
  bindSearchButton();
  // bindCheckboxes();
}

/**
 * event listeners on search input change
 */
function bindSearchBar() {
  const input_field = document.getElementById('search-field');
  input_field.addEventListener('input', function() {
    const input = this.value;
    backend.search_suggest(input).then(suggestions => {
      clearDropdowns();
      // rebuild
      const search_bar = document.querySelector('.search-bar');
      suggestions.forEach(suggestion => {
        const dropdown = document.createElement('div');
        dropdown.className = 'suggest_dropdown';
        dropdown.innerHTML = suggestion;
        dropdown.addEventListener('click', function() {
          input_field.value = this.innerHTML;
          hitSearch();
        });
        search_bar.appendChild(dropdown);
      });
    });
  });
}

/**
 * event listeners on search button click
 */
function bindSearchButton() {
  let recipe_list = document.querySelector('.recipes__wrapper');
  recipe_list.innerHTML = '';  // clear old recipe cards
  //set the default filter
  defaultPreference();
  //select the button
  //once the button got clicked, request the data from api and then output the result
  let button = document.querySelector('#search-button');
  button.addEventListener('click', hitSearch);
  // alternatively, enter key also trigger a search
  const input_field = document.getElementById('search-field');
  input_field.addEventListener('keyup', e => {
    if (e.key === 'Enter') hitSearch();  // enter key pressed
  });
}

/**
 * displays the recipe cards given a list of hashes
 * @param {Array<string>} recipe_hashes - an array of recipe hashes to display
 */
function displayCards(recipe_hashes) {
  let recipe_list = document.querySelector('.recipes__wrapper');
  recipe_list.innerHTML = '';  // clear old recipe cards
  current_recipes = recipe_hashes;
  for(let recipe_hash of recipe_hashes) {
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = backend.get_recipe(recipe_hash);
    document.querySelector('.recipes__wrapper').appendChild(recipeCard);
  }
  configureRecipeCards();
}

/**
 * app logic when we hit search
 */
function hitSearch() {
  clearDropdowns();  // remove all suggestions
  
  let list = readPreference();
  let recipe_name = document.querySelector('#search-field').value;
  backend.search_recipe(recipe_name, false, 10, list).then(displayCards);

  // USE FOR TESTING PURPOSES – to not overwhelm API
  // let recipe = backend.get_recipe('Apple Pie Pancakes$5316512375443084');
  // let recipeCard = document.createElement('recipe-card');
  // recipeCard.data = recipe;
  // document.querySelector('.recipes__wrapper').appendChild(recipeCard);
  // configureRecipeCards();
}

/**
 * wipe dropdowns
 */
function clearDropdowns() {
  const search_bar = document.querySelector('.search-bar');
  const suggest_dropdowns = document.getElementsByClassName('suggest_dropdown');
  let dropdown_length = suggest_dropdowns.length;
  while (dropdown_length --> 0) 
    search_bar.removeChild(suggest_dropdowns[dropdown_length]);
}

/**
 * add event listeners for each recipe card onclick
 */
function configureRecipeCards() {
  const recipeCards = document.querySelectorAll('recipe-card');
  recipeCards.forEach((card) => {
    card.addEventListener('click', () => {
      backend.select_recipe(card.shadowRoot.querySelector('.hash').textContent);
      window.location.assign('recipe-detail.html');
    });
  });
}

/**
 * read the check boxes to return a list of preferences
 * @returns {Array<string>} an array of preferences
 */
function readPreference(){
  let intolerance_list = [];
  const leftElmt = document.querySelector('.left');
  const leftCkbox = leftElmt.getElementsByClassName('container');

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

  return intolerance_list;
}

/**
 * apply the default preferences to the UI
 */
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
