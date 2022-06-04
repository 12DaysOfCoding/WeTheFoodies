import { db } from './auth.js';
import { auth } from './auth.js';
import {
  ref,
  get,
  child,
  push,
  remove
} from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';

/**
 * Adds recipes that the user has made. Only contains relevant information.
 * @param {*} recipeName Name of the recipe being saved
 * @param {*} servings Serving size of the recipe
 * @param {*} cookTime Cook time of the recipe
 * @param {*} instructions List of strings that make up the instrcutions
 * @param {*} dietRestrictions List of booleans for the user recipes
 * @param {*} ingredients List of ingredients for the user recipes
 * 
 */
export async function add_user_recipe(recipeHash, recipeName, servings, cookTime, instructions, dietRestrictions, ingredients, difficultyRealLevel) {
 
 
  const userRecipes = ref(db, 'users/' + auth.currentUser.uid + '/UserRecipes');
  await push(userRecipes, {
    Name: recipeName,
    Serving: servings,
    CookTime: cookTime,
    Instructions: instructions,
    DietRestrictions: dietRestrictions,
    Ingredients: ingredients,
    Hash: recipeHash,
    Difficulty: difficultyRealLevel
  });
  return true;
}

/**
 * Get list of the user's created recipes
 * @returns A list of user's past created recipes
 */
export async function get_user_recipes() {
  const dbRef = ref(db);
  let finalData = null;
  await get(child(dbRef, `users/${auth.currentUser.uid}/UserRecipes`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        finalData = snapshot.val();
        var userList = [];
        for(var x in finalData)
          userList.push(finalData[x]);
       
        return userList;
      } else 
        console.log('No data available');
            
    })
    .catch((error) => {
      console.error(error);
    });
  return finalData;
}
/**
 * Getting the name of the user's favorited recipe
 * @param {*} recipeName Name (not hashkey) of the favorite recipe being added to the DB
 */
export function add_favorite(recipeName){

  const favRecipes = ref(db, 'users/' + auth.currentUser.uid + '/FavoriteRecipes');
  push(favRecipes , recipeName);
}

/**
 * Fetch the user's favorite recipes
 * @returns A list object of favorite recipes
 */
export async function get_favorites(){
  const dbRef = ref(db);
  let finalData = null;
  await get(child(dbRef, `users/${auth.currentUser.uid}/FavoriteRecipes`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        finalData = snapshot.val();
        return finalData;
      } else 
        console.log('No data available');
            
    })
    .catch((error) => {
      console.error(error);
    });
  return finalData;
}

/**
 * Deletes the recipe matching the hash in the database under the user created recipes
 * @param {*} recipeHash 
 */
export async function delete_user_recipe(recipeHash){

  const dbRef = ref(db);
  await get(child(dbRef, `users/${auth.currentUser.uid}/UserRecipes`)).then((snapshot) => {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().Hash === recipeHash){
        const childRef =  ref(db, 'users/' + auth.currentUser.uid + '/UserRecipes/' + childSnapshot.key);
        remove(childRef);
      }
      
    });
  });

}


/**
 * Edits the recipe matching the name in the database under the user created recipe
 * @param {*} recipeName Name of the recipe to edit
 * @param {*} recipe Recipe object to extract data
 */
export async function edit_recipe(recipe_hash, recipe){
  await delete_user_recipe(recipe_hash);
  await add_user_recipe(recipe_hash, recipe.name,recipe.servings, recipe.readyInMinutes, recipe.steps, recipe.intolerances, recipe.ingredients,recipe.difficulty_realLevel  );



}

/**
 * Deletes the recipe matching the name in the database under their favorites
 * @param {*} recipeName 
 */
export async function delete_favorite_recipe(recipeName){
  recipeName = recipeName.split('$')[0];
  const dbRef = ref(db);
  await get(child(dbRef, `users/${auth.currentUser.uid}/FavoriteRecipes`)).then((snapshot) => {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val() === recipeName){
        const childRef =  ref(db, 'users/' + auth.currentUser.uid + '/FavoriteRecipes/' + childSnapshot.key);
        remove(childRef);
      }
      
    });
  });

}


