/** @module backend */

import { recipe_data, keep_fields } from './recipe-data.js';

const API_KEY = '486eca841c6a49b896486723439f9977';
const CUSTOM_RECIPE_KEY = '%custom_recipes';
const FAVORITE_RECIPE_KEY = '%favorite_recipes';
const INTOLERANCE_KEY = '%intolerances';

/**
 * search a recipe by its name and return a promise of list of raw json
 * @param {string} name - name of the recipe
 * @param {Array<string>} intolerances - a list of intolerances. see below for details
 * @returns {Promise} - a list of unfiltered recipe, empty if non found
 */
async function fetch_recipe_raw(name, intolerances) {
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
function compute_hash(recipe) {
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
  
  return recipe.name + '$' + cyrb53(JSON.stringify(recipe.steps));
}

/**
 * computes the difficulty of a recipe
 * @param {Object} recipe - a recipe object whose steps, ingredients, and cooktime are populated
 * @return {float} - a difficulty rating as #ingredients * #steps / cooktime
 */
function compute_difficulty(recipe) {
  if (!Array.isArray(recipe.ingredients)) throw 'ingredients array malformed';
  else if (!(Array.isArray(recipe.steps))) throw 'steps array malformed';
  else if (recipe.readyInMinutes <= 0) throw 'nonpositive cooktime';
  return recipe.ingredients.length * recipe.steps.length / recipe.readyInMinutes;
}

/**
 * @param {string} key 
 * @param {Object} value 
 */
function set_localstore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @param {string} key
 * @return {object} value associated with the key, null if not found
 */
function get_localstore(key) {
  const obj_str_repr = localStorage.getItem(key);
  return obj_str_repr ? JSON.parse(obj_str_repr) : null;
}

/**
 * @param {Object} recipe - a custom recipe whose name, steps, ingredients, and cooktime are populated.
 *  note that it is not necessary to populate the hash and difficulty since they will be done for you
 * @return {Object} - a copy of the added recipe for testing purpose
 */
export function add_recipe(recipe, custom=false) {
  recipe.hash = compute_hash(recipe);
  recipe.difficulty = compute_difficulty(recipe);
  set_localstore(recipe.hash, recipe);
  if (custom) add_custom(recipe.hash);  // add the hash to an "custom recipe" hashmap
  return recipe;
}

/**
 * @param {string} recipe_hash - the key to the recipe entry in localstore
 * @return {Object} - the recipe object if found, null otherwise
 */
export function get_recipe(recipe_hash){
  const recipe = get_localstore(recipe_hash);  // null if not found
  if (!recipe) console.warn(`${recipe_hash} not in localstore, check your arguments`);
  return recipe;
}

/**
 * @param {string} recipe_hash
 */
export function remove_recipe(recipe_hash){
  if(localStorage.getItem(recipe_hash)) {
    localStorage.removeItem(recipe_hash);
    // note that we also need to remove it from both the custom and favorite arr
    remove_custom(recipe_hash);
    remove_favorite(recipe_hash);
  } else {
    console.warn(`${recipe_hash} not in localstore, check your arguments`);
  }
}

/**
 * add a recipe hash to an array. helper function for add favorite/custom
 * @param {string} recipe_hash 
 * @param {string} arr_name 
 */
function add_hash_to_arr(recipe_hash, arr_name) {
  let arr = get_localstore(arr_name);
  if (!arr) arr = [];
  arr.push(recipe_hash);
  const hash_set = new Set(arr);  // quick removal of dup
  set_localstore(arr_name, [...hash_set]);
}

/**
 * remove a recipe hash in an array. helper function for remove favorite/custom
 * @param {string} recipe_hash 
 * @param {string} arr_name 
 */
function remove_hash_in_arr(recipe_hash, arr_name) {
  const arr = get_localstore(arr_name);
  if (!arr) {
    console.warn(`${arr_name} does not exist, check your arguments`);
    return;  // go home early
  }
  // otherwise
  const hash_set = new Set(arr);
  if (!hash_set.delete(recipe_hash)) {  // not in set
    console.warn(`${recipe_hash} is not in ${arr_name}, check your arguments`);
  } else {  // overwrite to localstore
    set_localstore(arr_name, [...hash_set]);
  }
}

/**
 * mark a recipe as custom
 * @param {string} recipe_hash 
 */
export function add_custom(recipe_hash) {
  add_hash_to_arr(recipe_hash, CUSTOM_RECIPE_KEY);
}

/**
 * get an array of recipe that are custom
 * @return {Array<string>} an array of custom item, empty if non exisit
 */
export function get_custom() {
  const custom_recipes = get_localstore(CUSTOM_RECIPE_KEY);
  return custom_recipes ? custom_recipes : [];
}

/**
 * unmark a recipe as custom
 * @param {string} recipe_hash 
 */
export function remove_custom(recipe_hash) {
  remove_hash_in_arr(recipe_hash, CUSTOM_RECIPE_KEY);
}

/**
 * mark a recipe as favorite
 * @param {string} recipe_hash 
 */
export function add_favorite(recipe_hash) {
  add_hash_to_arr(recipe_hash, FAVORITE_RECIPE_KEY);
}

/**
 * get a list of starred recipe
 * @return {Array<string>} an array of favorite item, empty if non exisit
 */
export function get_favorite() {
  const favorites = get_localstore(FAVORITE_RECIPE_KEY);
  return favorites ? favorites : [];
}

/**
 * unfavorite a recipe
 * @param {string} recipe_hash 
 */
export function remove_favorite(recipe_hash) {
  remove_hash_in_arr(recipe_hash, FAVORITE_RECIPE_KEY);
}

/**
 * @param {Array<string>} - a list of intolerance that user applied
 */
export function set_intolerance(intolerance_list) {
  set_localstore(INTOLERANCE_KEY, intolerance_list);
}

/**
 * @return {Array<string>} an array of intolerance, empty if non
 */
export function get_intolerance() {
  const intolerance = get_localstore(INTOLERANCE_KEY);
  return intolerance ? intolerance : [];
}
