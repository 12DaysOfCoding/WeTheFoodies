/** @module recipe-data */

// format of the recipe data object
/** @global */
export const recipe_data = {
  'hash': 'a unique identifier, also the key in localstore',
  'name': 'name of recipe',
  'thumbnail': 'image url',
  'author': 'name of creator',
  'dishTypes': [],  // array of string. breakfast/lunch/etc.
  'ingredients': [],  // array of Spoonacular ingredient objects
  'intolerances': [],  // array of intolerances
  'steps': [],  // array of Spoonacular step objects
  'cuisines': [],  // 'array of string. American/Idian/etc.'
  'pricePerServing': 0,
  'readyInMinutes': 0,
  'servings': 0,
  'vegan': true,
  'vegetarian': true
}

// fields we want to keep from the raw json response of Spoonacular and what they remap to
/** @global */
export const keep_fields = {
  'id': 'hash',
  'title': 'name',
  'image': 'thumbnail',
  'sourceName': 'author',
  'dishTypes': 'dishTypes',
  'extendedIngredients': 'ingredients',
  'diets': 'intolerances',
  'analyzedInstructions': 'steps',
  'cuisines': 'cuisines',
  'pricePerServing': 'pricePerServing',
  'readyInMinutes': 'readyInMinutes',
  'servings': 'servings',
  'vegan': 'vegan',
  'vegetarian': 'vegetarian'
};
