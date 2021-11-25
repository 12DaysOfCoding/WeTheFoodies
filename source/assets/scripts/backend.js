/** @module backend */

import { recipe_data, keep_fields } from './recipe-data.js';

const API_KEY = `486eca841c6a49b896486723439f9977`;

/**
 * search a recipe by its name and return a promise of list of raw json
 * @param {string} name - name of the recipe
 * @param {Array<string>} intolerances - a list of intolerances. see below for details
 * @returns {Promise} - a list of unfiltered recipe, empty if non found
 */
export async function fetch_recipe_raw(name, intolerances) {
  const intolerances_str = Array.isArray(intolerances) ? `&intolerances=${intolerances.join(',')}` : '';
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${name}${intolerances_str}&apiKey=${API_KEY}&addRecipeInformation=true&fillIngredients=true`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.results) return data.results;
  else return [];  // an empty list
}

/**
 * search a recipe by its name and keep only the parts we need according to the global variable keep_fields
 * we then remap the field names by the rule fields_remap
 * afterwards, it saves all filtered recipes to the localstore
 * @param {string} name - name of the recipe 
 * @param {Array<string>} intolerances - a list of intolerances. for a list of supported keywords, see 
 *  https://spoonacular.com/food-api/docs#:~:text=of%20supported%20diets.-,intolerances,-string
 *  Note that this functionality is pretty bad since if a recipe can be nut free without listing nuts as intolerance
 * @return {Promise} returns a list of fetched recipe for testing purpose
 */
export async function fetch_recipe(name, intolerances) {
  const raw_recipes = await fetch_recipe_raw(name, intolerances);
  // for each recipe, keep only ones in keep_fields and rename them accordingly
  return raw_recipes.map(raw_recipe => {
    const recipe = Object.create(recipe_data);  // prototype inherit recipe_data
    // grab data from raw json
    Object.keys(keep_fields).forEach(key => recipe[keep_fields[key]] = raw_recipe[key]);
    recipe.steps = recipe.steps[0].steps;  // special modification: spoonacular's step array is cursed
    return add_recipe(recipe);
  });
}

/**
 * compute the hash of a recipe by hashing its steps as a string
 * @param {Object} recipe - a recipe object whose name and steps are populated
 * @return {string} - hash of its steps as a string
 */
export function compute_hash(recipe) {
  if (!recipe.name) throw 'recipe has no name';
  else if (!recipe.steps) throw 'recipe has no steps';

  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/7616484#7616484
  const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1>>>0)).toString();
  };
  
  return recipe.name + cyrb53(JSON.stringify(recipe.steps));
}

/**
 * computes the difficulty of a recipe
 * @param {Object} recipe - a recipe object whose steps, ingredients, and cooktime are populated
 * @return {float} - a difficulty rating as #ingredients * #steps / cooktime
 */
export function compute_difficulty(recipe) {
  if (!Array.isArray(recipe.ingredients)) throw 'ingredients array malformed';
  else if (!(Array.isArray(recipe.steps))) throw 'steps array malformed';
  else if (recipe.readyInMinutes <= 0) throw 'nonpositive cooktime';
  return recipe.ingredients.length * recipe.steps.length / recipe.readyInMinutes;
}

/**
 * add a recipe object to localstore
 * @param {Object} recipe - a custom recipe whose name, steps, ingredients, and cooktime are populated.
 *  note that it is not necessary to populate the hash and difficulty since they will be done for you
 * @return {Object} - a copy of the added recipe for testing purpose
 */
export function add_recipe(recipe, custom=false) {
  recipe.hash = compute_hash(recipe);
  recipe.difficulty = compute_difficulty(recipe);
  localStorage.setItem(recipe.hash, JSON.stringify(recipe));
  return recipe;
}

/**
 * get a recipe object by its hash
 * @param {string} recipe_hash - the key to the recipe entry in localstore
 * @return {Object} - the recipe object if found, null otherwise
 */
export function get_recipe(recipe_hash){
  if(localStorage.getItem(recipe_hash)) {
    return JSON.parse(localStorage.getItem(recipe_hash));
  } else {
    console.warn('Can not find recipe info in local, can not get. Check if you passed in the right hash');
    return null;
  }
}

/**
 * remove a recipe object by its hash
 * @param {string} recipe_hash 
 */
export function remove_recipe(recipe_hash){
  if(localStorage.getItem(recipe_hash)) {
    localStorage.removeItem(recipe_hash);
    //TODO also remove from favorite
  } else {
    console.warn('Do not have recipe info in local, operation ignored. Check if you passed in the right hash');
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
    set_localstore('intolerance',intolerance_list);
}
