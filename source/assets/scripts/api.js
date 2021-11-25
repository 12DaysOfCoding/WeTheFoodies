/** @module api */

import { recipe_data, keep_fields } from './recipe-data.js';

/**
 * search a recipe by its name and return a promise of list of raw json
 * @param {string} name - name of the recipe
 * @param {Array<string>} intolerances - a list of intolerances. see below for details
 * @returns {Promise} - a list of unfiltered recipe, empty if non found
 */
export async function search_recipe_raw(name, intolerances) {
  const intolerances_str = Array.isArray(intolerances) ? `&intolerances=${intolerances.join(',')}` : '';
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${name}${intolerances_str}&apiKey=486eca841c6a49b896486723439f9977&addRecipeInformation=true&fillIngredients=true`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.results) return data.results;
  else return [];  // an empty list
}

/**
 * search a recipe by its name and keep only the parts we need according to the global variable keep_fields
 * we then remap the field names by the rule fields_remap
 * if no recipe is found, it should return a promise of an empty list
 * @param {string} name - name of the recipe 
 * @param {Array<string>} intolerances - a list of intolerances. for a list of supported keywords, see 
 *  https://spoonacular.com/food-api/docs#:~:text=of%20supported%20diets.-,intolerances,-string
 *  Note that this functionality is pretty bad since if a recipe can be nut free without listing nuts as intolerance
 * @returns {Promise} - a list of filtered recipe
 */
export async function search_recipe(name, intolerances) {
  const raw_recipes = await search_recipe_raw(name, intolerances);
  // for each recipe, keep only ones in keep_fields and rename them accordingly
  const filtered_recipes = raw_recipes.map(raw_recipe => {
    const recipe = Object.create(recipe_data);  // prototype inherit recipe_data
    Object.keys(keep_fields).forEach(key => recipe[keep_fields[key]] = raw_recipe[key]);
    recipe.steps = recipe.steps[0].steps; // special modification 1: spoonacular's step array is cursed
    recipe.difficulty = recipe.ingredients.length * recipe.steps.length / recipe.readyInMinutes;  // calculate difficulty
    recipe.hash = recipe.hash.toString();  // turn hash from int to string
    return recipe;
  });
  return filtered_recipes;
}

// Parameter:
// recipe_name: the recipe name 
// it will automaticlt get and parse the recipe in local storage if it can't find it it will just print a sentence to console,.
export function get_info_localstore(recipe_name){
  if(localStorage.getItem(recipe_name)) {
    return JSON.parse(localStorage.getItem(recipe_name));
  } else {
    console.log('Can not find recipe info in local,can not get');
    return undefined;
  }
}

// Parameter:
// recipe_name: the recipe name 
// recipe_info: the recipe object
// it will automaticlt change the info to string and store it in the local storage, 
// if locale storage already have it it will just print a sentence to console.
export function set_localstore(recipe_name,recipe_info){
  if(!localStorage.getItem(recipe_name)) {
    localStorage.setItem(recipe_name,JSON.stringify(recipe_info));
  } else {
    console.log('Already Saved this recipe before,can not save it again');
  }
}

// Parameter:
// recipe_name: the recipe name 
// it will automaticlt remove the recipe in local storage if it can't find it it will just print a sentence to console,.
export function remove_localstore(recipe_name){
  if(localStorage.getItem(recipe_name)) {
    localStorage.removeItem(recipe_name);
  } else {
    console.log('Do not have recipe info in local, can not remove');
  }
}
  
// Parameter:
// id: id of the recipe
// add recipe to favorite list
export function add_favorite(id){
  let fav=get_info_localstore('favorite');
  if(fav==undefined){
    let temp=new Array(0);
    temp.push(id);
    set_localstore('favorite',temp);
  }
  else{
    if(fav.indexOf(id)==-1){
      fav.push(id);
      remove_localstore('favorite');
      set_localstore('favorite',fav);
    }
    else{
      console.log('Add: Recipe already in the favorite list');
    }
  }
}

// Parameter:
// id: id of the recipe
// remove recipe to favorite list
export function remove_favorite(id){
  let fav=get_info_localstore('favorite');
  if(fav==undefined){
    console.log('Favorite list is empty');
  }
  else{
    let index=fav.indexOf(id);
    if(index==-1)
    {
      console.log('Remove: Recipe not in the favorite list');
    }
    else{
      fav.splice(index,1);
      remove_localstore('favorite');
      set_localstore('favorite',fav);
    }
  }
}

// Parameter:
// id: id of the recipe
// add recipe to custom added list
export function add_custom(id){
  let added=get_info_localstore('custom');
  if(added==undefined){
    let temp=new Array(0);
    temp.push(id);
    set_localstore('custom',temp);
  }
  else{
    if(added.indexOf(id)==-1){
      added.push(id);
      remove_localstore('custom');
      set_localstore('custom',added);
    }
    else{
      console.log('Add: Recipe already in the custom list');
    }
  }
}

// Parameter:
// id: id of the recipe
// remove recipe to custom added list
export function remove_custom(id){
  let added=get_info_localstore('custom');
  if(added==undefined){
    console.log('Custom list is empty');
  }
  else{
    let index=added.indexOf(id);
    if(index==-1)
    {
      console.log('Remove: Recipe not in the cuntom list');
    }
    else{
      added.splice(index,1);
      remove_localstore('custom');
      set_localstore('custom',added);
    }
  }
}

/**
 * This function will get a array of intolerance then store them into local storage with the key intolerance
 * @param {Array<string>} intolerance_list - a list of intolerance that user applied
 */
 export function set_intolerance(intolerance_list){
  let intolerance=get_info_localstore('intolerance');
  if(intolerance==undefined){
    set_localstore('intolerance',intolerance_list);
  }
  else{
    remove_localstore('intolerance');
    set_localstore('intolerance',intolerance_list);
  }
}