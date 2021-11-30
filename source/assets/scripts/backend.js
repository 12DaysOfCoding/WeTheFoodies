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
    if (recipe.steps.length) {
      recipe.steps = recipe.steps[0].steps;  // special modification: spoonacular's step array is cursed
    }
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
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;  // eslint-disable-line no-eval
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);  // eslint-disable-line no-eval
      h2 = Math.imul(h2 ^ ch, 1597334677);  // eslint-disable-line no-eval
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);  // eslint-disable-line no-eval
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);  // eslint-disable-line no-eval
    return (4294967296 * (2097151 & h2) + (h1>>>0)).toString();  // eslint-disable-line no-eval
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

let char_coords = {};  // keyboard layout in rows. inited upon first use
/**
 * helper function that returns the cost of turning c1 -> c2
 * this is related to how far apart the characters are on the keyboard
 * @param {char} c1 
 * @param {char} c2 
 */
function sub_cost(c1, c2) {
  c1 = c1.toLowerCase();
  c2 = c2.toLowerCase();
  if (c1 === c2) return 0;
  if (Object.keys(char_coords).length === 0) {
    const row_strs = ['1234567890-', 'qwertyuiop', 'asdfghjkl;\'"', 'zxcvbnm,./', '      '];
    const offsets = [0, 0, 0, 1, 1];
    row_strs.forEach((row_str, r) => {
      for (let c = 0; c < row_str.length; c++)
        char_coords[row_str.charAt(c)] = [r, c+offsets[r]];  
    });
  }
  const coords1 = char_coords[c1], coords2 = char_coords[c2];
  if (!coords1 || !coords2) return 2;  // weird character
  else if (Math.abs(coords1[0]-coords2[0])<2 && Math.abs(coords1[1]-coords2[1])<2) return 1;
  else return 2; // large distance
}

/**
 * calculate the minimum edit distance to edit the first string to be the second
 * @param {string} str1 
 * @param {string} str2 
 * @param {float} del_cost 
 * @param {float} add_cost 
 * @param {float} sub_cost 
 */
function min_edit_dist(str1, str2, del_cost=1, add_cost=1) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();  // ignore case
  let m = str1.length, n = str2.length;
  let dp = Array.from(Array(m+1), () => new Array(n+1));
  dp[0][0] = 0;  // two empty strings
  for (let i = 1; i <= m; i++) dp[i][0] = del_cost*i;
  for (let j = 1; j <= n; j++) dp[0][j] = add_cost*j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let c1 = str1.charAt(i-1), c2 = str2.charAt(j-1);
      if (c1 === c2) dp[i][j] = dp[i-1][j-1];  // no edit
      else {  // we will have to edit
        dp[i][j] = Math.min(dp[i-1][j-1]+sub_cost(c1, c2), 
          Math.min(dp[i-1][j]+del_cost, dp[i][j-1]+add_cost));  // min of the three
      }
    }
  }
  return dp[m][n];
}

/**
 * search recipe in the localstore and as well as an option to auto fetch from the internet
 * @param {string} name - name of the recipe you want to search 
 * @param {boolean} online - whether you want to pull in online results (local search by default)
 * @param {float} match_tolerance - max distance between two strings that the fuzzy search allows
 * @return {Promise} a list of recipe_hash
 */
export async function search_recipe(name, online=false, match_tolerance=10) {
  if (!name.length) return [];  // empty search
  else if (online) await fetch_recipe(name);  // populate localstore

  const multimap = [];  // stores (name, recipe_hash) pair
  for (let i = 0; i < localStorage.length; i++) {
    const recipe_hash = localStorage.key(i);
    if (recipe_hash.startsWith('%')) continue;  // ignore
    const recipe_name = recipe_hash.substring(0, recipe_hash.indexOf('$'));
    multimap.push([recipe_name, recipe_hash]);
  }

  const result = [];
  multimap.forEach(itm => {
    const [recipe_name, recipe_hash] = itm;
    let dist;
    if (recipe_name.toLowerCase().includes(name.toLowerCase())) {  // substr
      dist = -name.length/recipe_name.length;  // huristics: shorter name better
    } else {
      dist = min_edit_dist(name, recipe_name);  // calculate its edit dist
    }

    if (dist < match_tolerance)
      result.push([recipe_hash, dist]);  // use the distance as a sorting key
  });
  result.sort((a, b) => a[1]-b[1]);  // sort by distance
  return result.map(itm => itm[0]);  // grab the name
}

/**
 * suggest some recipes a user might be looking for
 * @param {string} name - user input
 * @param {float} match_tolerance - max distance between two strings that the fuzzy search allows
 * @param {float} return_size - max length of the return array
 * @return an array of recipe names that might be the thing you are searching for sorted by relavance
 */
export async function search_suggest(name, match_tolerance=15, return_size=5) {
  if (!name.length) return [];  // empty search
  const recipe_hashes = await search_recipe(name, false, match_tolerance);
  const recipe_names = recipe_hashes.map(hash => hash.substring(0, hash.indexOf('$')));
  const hash_set = new Set();
  const deduped_names = [];  // we want to remove dups but keep the order
  for (const name of recipe_names) {
    if (hash_set.has(name)) continue;
    hash_set.add(name);
    deduped_names.push(name);
    if (deduped_names.length >= return_size) break;
  }
  return deduped_names;
}

/**
 * filter the intolerance follow the user preferences
 * @param {Object} recipe - a recipe object defined in the recipe-data
 * @return {boolean} - true if pass the filter, false if not
 */
 export function filter_intolerance(recipe){
  const intolerance = get_localstore(INTOLERANCE_KEY);
  if(intolerance == null){
    return true;
  }
  const specialSet = new Set();  //Make a hashset for checking
  for(let i = 0; i < intolerance.length;i++){
    switch(intolerance[i]){
      case 'Vegan':
        specialSet.add("Meat");
        specialSet.add("Milk, Eggs, Other Dairy");
        break;
      case 'Vegetarian':
        specialSet.add("Meat");
        break;
      case 'Dairy-free':
        specialSet.add("Milk, Eggs, Other Dairy");
        break;
      case 'Seafood-free':
        specialSet.add("Seafood");
        break;
      case 'Gluten-free':
        specialSet.add("Gluten Free");
        break;
      case 'Tree Nut-free':
        specialSet.add("Nuts;Savory Snacks");
        break;
      case 'Peanut-free':
        specialSet.add("Nuts;Savory Snacks");
        break;
    }
  }

  let ingredientsList = recipe.ingredients;
  for(let j = 0; j < ingredientsList.length;j++){
    let thisAisle = ingredientsList[j].aisle;
    if(specialSet.has(thisAisle)){
      return false;
    }
  }

  return true;
}