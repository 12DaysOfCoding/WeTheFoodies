// index.js
/** @module index */

import * as backend from './backend.js';
import * as database from './database.js';
import {auth} from './auth.js';

import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js';

// user has visited before! proceed with init
// ( init has additional redirects in case the local storage is set, but the user is not logged in )
if (localStorage.getItem('%not_first_visit'))
  window.addEventListener('DOMContentLoaded', init);

// user is either not logged in or has not been onboarded!
else  // first visit
  onAuthStateChanged(auth, async (user) => {
    if (user)
      window.location.assign('onBoardingPage.html');  // logged in! send to onboarding
    else
      window.location.assign('login.html');           // not logged in! send to login
  });

  

/**
 * Initialize and call other functions
 */
async function init() {
  var firstTime = localStorage.getItem('%first_time');
  if (firstTime == null) 
    // first time loaded!
    localStorage.setItem('%first_time', '1');
  else
    localStorage.setItem('%first_time', '2');
  
  await renderSavedRecipes();
  renderCustomRecipes();
}

async function renderSavedRecipes() {

  if (localStorage.getItem('%first_time') !== '1') {
    const favorites = backend.get_favorite();
    console.log(favorites);
    if (favorites.length !== 0) document.querySelector('.saved-recipes__wrapper').innerHTML = '';
    favorites.forEach(function (recipeHash) {
      const recipe = backend.get_recipe(recipeHash);
      let recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipe;
      document.querySelector('.saved-recipes__wrapper').appendChild(recipeCard);

      recipeCard.addEventListener('click', () => {
        backend.select_recipe(recipe.hash);
        window.location.assign('recipe-detail.html');
      });
    });
  } else {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(auth.currentUser.uid);
        var favoritesList = {};
        favoritesList = await database.get_favorites();
        favoritesList = new Map(Object.entries(favoritesList));
        const favorites = [];
        for (const recipeName of favoritesList.values()) 
          favorites.push(await backend.fetch_recipe(recipeName));
        
        if (favorites.length !== 0) document.querySelector('.saved-recipes__wrapper').innerHTML = '';
        favorites.forEach(function (recipe) {

          backend.add_favorite(recipe[0].hash);
          recipe = recipe[0];
          let recipeCard = document.createElement('recipe-card');
          if (recipe.difficulty === 0) 
            recipe.difficulty = 1;
          
          recipe.difficulty_realLevel = Math.round(recipe.difficulty);
          recipeCard.data = recipe;
          document.querySelector('.saved-recipes__wrapper').appendChild(recipeCard);

          recipeCard.addEventListener('click', () => {
            backend.select_recipe(recipe.hash);
            window.location.assign('recipe-detail.html');
          });
        });

      } else 
        window.location.assign('login.html');         // not logged in! send to login
      
    });
  }


}

function renderCustomRecipes() {
  if (localStorage.getItem('%first_time') !== '1') {
    const customRecipes = backend.get_custom();
    if (customRecipes.length !== 0) document.querySelector('.my-recipes__wrapper').innerHTML = '';
    customRecipes.forEach(function (recipeHash) {
      const recipe = backend.get_recipe(recipeHash);
      let recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipe;
      document.querySelector('.my-recipes__wrapper').appendChild(recipeCard);

      recipeCard.addEventListener('click', () => {
        backend.select_recipe(recipe.hash);
        window.location.assign('recipe-detail.html');
      });
    });

  } else {

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {

        // Remove any existing custom recipes from local storage
        var customRecipes = backend.get_custom();
        customRecipes.forEach(function (recipeHash) {
          backend.remove_custom(recipeHash)
        });

        var customList = {};
        customList = await database.get_user_recipes();
        for(const recipe in customList){
          var recipeObj = customList[recipe];
          let customRecipe = {};
          customRecipe.name = recipeObj.Name;
          customRecipe.steps = recipeObj.Instructions;
          customRecipe.ingredients = recipeObj.Ingredients;
          customRecipe.readyInMinutes = recipeObj.CookTime;
          customRecipe.serving = recipeObj.Serving;
          customRecipe.intolerances = recipeObj.DietRestrictions;
          customRecipe.difficulty_realLevel = 1;
          backend.add_recipe(customRecipe, true);
        }
        
        customRecipes = backend.get_custom();
        console.log(customRecipes);
        if (customRecipes.length !== 0) document.querySelector('.my-recipes__wrapper').innerHTML = '';
        customRecipes.forEach(function (recipeHash) {
          const recipe = backend.get_recipe(recipeHash);
          let recipeCard = document.createElement('recipe-card');
          recipeCard.data = recipe;
          document.querySelector('.my-recipes__wrapper').appendChild(recipeCard);

          recipeCard.addEventListener('click', () => {
            backend.select_recipe(recipe.hash);
            window.location.assign('recipe-detail.html');
          });
        });

      } else 
        window.location.assign('login.html');         // not logged in! send to login
      
    });

  }

}