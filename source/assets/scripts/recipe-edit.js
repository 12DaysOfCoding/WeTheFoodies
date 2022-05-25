/** @module recipe-edit */

import * as backend from './backend.js';

if (localStorage.getItem('%not_first_visit')) 
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect

var ingredientIndex = 1;
var instructionIndex = 1;

// Prevent "Enter to submit the recipe"
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter")
    e.preventDefault();
});

/**
 * Initialize and call other function
 */
async function init() {
  const selected = backend.get_selected()

  if (selected == "") {
    window.location.assign('index.html');
    return;
  }
  
  const recipe = backend.get_recipe(selected);

  // Populate fields with given recipe info
  document.getElementById('recipeName').value = recipe["name"];
  document.getElementById('cookingTime').value = recipe["readyInMinutes"];
  document.getElementById('servingSize').value = recipe["servings"];

  const diff = parseInt(recipe["difficulty_realLevel"]);
  document.getElementsByName('diff')[diff-1].checked = true;
  if(!recipe.intolerances ){
    recipe.intolerances = []
  }
  recipePreferences(recipe.intolerances);

  /**
   * Click or "Enter" to add a new line for filling ingredients
   * Prime Add Ingredient Button, and render list of existing ingredients
   */

  let btn = document.getElementById('ingredientButton');
  btn.addEventListener('click', addIngredient);
  let ingredient_keyboard = document.getElementById('ingredientOrderedList');
  ingredient_keyboard.addEventListener('keydown', (event)=>{
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Enter") {
      addIngredient().focus();
    }
  });

  if (recipe.ingredients.length > 0)
    document.getElementById('ingredient-1').value = recipe.ingredients[0].original;

  for (let i = 1; i < recipe.ingredients.length; i++) {
    (addIngredient()).value = recipe.ingredients[i].original;
  }

  /**
   * Click or "Enter" to add a new line for filling instructions
   * Prime Add Step Button, and render list of existing steps
   */
  btn = document.getElementById('instructionButton');
  btn.addEventListener('click', addInstruction);
  let instruction_keyboard = document.getElementById('instructionOrderedList');
  instruction_keyboard.addEventListener('keydown', (event)=>{
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Enter") {
      addInstruction().focus();
    }
  });
  

  if (recipe.steps.length > 0)
    document.getElementById('instruction-1').value = recipe.steps[0].step;

  for (let i = 1; i < recipe.steps.length; i++) {
    // console.log (step_str);
    (addInstruction()).value = recipe.steps[i].step;
  }
  
  editRecipe();
}

/**
 * Edit Recipe from local storage
 */
function editRecipe() {
  const submit = document.getElementById('submit');

  submit.addEventListener('click', (event) => {
    // handle the form data
    // console.log('New Recipe Added');

    event.preventDefault();
    let recipe = backend.get_recipe(backend.get_selected());  // Suggestion: get original recipe JSON and load new values into it
    const recipe_hash = recipe['hash'];
 
    const nameField = document.getElementById('recipeName').value;
    recipe.name = nameField;

    const cookingTimeField = document.getElementById('cookingTime').value;
    recipe.readyInMinutes = cookingTimeField;

    const servingSizeField = document.getElementById('servingSize').value;
    recipe.servings = servingSizeField;
    
    let radios = document.getElementsByName('diff');
    for (let i = 0, length = radios.length; i < length; i++) 
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        recipe.difficulty_realLevel = radios[i].value;
        // console.log(radios[i].value);
        // only one radio can be logically checked, don't check the rest
        break;
      }

    var veganBox = document.getElementById('vegan');
    if (veganBox.checked)
      recipe.vegan = true;
    else
      recipe.vegan = false;
      
    var veggieBox = document.getElementById('veggie');
    if (veggieBox.checked)
      recipe.vegetarian = true;
    else
      recipe.vegetarian = false;
            
    // let ingredientListLength = document.querySelectorAll('#ingredientOrderedList li').length;

    let ingredientArr = [];
    // console.log(ingredientListLength);
    let ingredientArrIndex = 0;
    
    // ingredientIndex: # of all the li's added (including the li's which are deleted)
    for(let i = 1; i <= ingredientIndex; i++){
      let str = 'ingredient-'+i;
      // console.log(str);
      let ing = document.getElementById(str);
      // check whether the li is deleted - if deleted, it is null, don't add.
      if (ing && ing.value){
        // console.log(ing.value);
        let theIngredient = {original:ing.value};
        ingredientArr[ingredientArrIndex] = theIngredient;
        ingredientArrIndex += 1;
      }
    }
    recipe.ingredients = ingredientArr;

    //instruction 
    // let instructionListLength = document.querySelectorAll('#instructionOrderedList li').length;

    let instructionArr = [];
    // console.log(instructionListLength);
    let instructionArrIndex = 0;
    
    // instructionIndex: # of all the li's added (including the li's which are deleted)
    for(let i = 1; i <= instructionIndex; i++){
      let str = 'instruction-'+i;
      // console.log(str);
      let ing = document.getElementById(str);
      // check whether the li is deleted - if deleted, it is null, don't add.
      if (ing && ing.value){
        // console.log(ing.value);
        let step = {number:i, step:ing.value};
        instructionArr[instructionArrIndex] = step;
        instructionArrIndex += 1;
      }
    }
    recipe.steps = instructionArr;

    recipe.intolerances = readPreference();

    try {
      backend.recipe_field_check(recipe);
    } catch (e) {
      alert(e);
      return;
    }

    const file = document.querySelector('input[type=file]').files[0];
    if (file) {  // inputed a file
      const reader = new FileReader();
      try {  // save the image and then add
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          localStorage.setItem(`!${recipe.servings}${recipe.name}${recipe.readyInMinutes}`, reader.result);
          recipe.thumbnail=localStorage.getItem(`!${recipe.servings}${recipe.name}${recipe.readyInMinutes}`);
          backend.edit_recipe(recipe_hash, recipe, true);  // using the backend to simply logic
          window.location.assign('index.html');
        });
      } catch(e) {
        alert(e);
      }
    } else   // no file
      try {  // add directly
        backend.edit_recipe(recipe_hash,recipe, true);  // using the backend to simply logic
        window.location.assign('index.html');
      } catch(e) {
        alert(e);
      }
    
  });
}
  
/**
 * Click to add a new line for filling ingredients
 */
function addIngredient() {
    let box = document.getElementById('ingredientOrderedList');

    ingredientIndex += 1;
    let node = document.createElement('LI');  
    node.id = `ingredientNode-${ingredientIndex}`;
    let nodeInput = document.createElement('input');
    let br = document.createElement('br');
    nodeInput.type='text';
    nodeInput.id = `ingredient-${ingredientIndex}`;
    nodeInput.autocomplete = 'off';
    nodeInput.appendChild(br);
    node.appendChild(nodeInput);
    let img = document.createElement('img');
    img.id = `delete-ingredient-${ingredientIndex}`;
    img.className = 'delete';
    img.src = 'assets/images/delete-button.png';
    // Delete the node
    let nodeId = `ingredientNode-${ingredientIndex}`;
    img.onclick = function(){
      let node = document.getElementById(nodeId);
      node.remove();
    };
    node.appendChild(img);
    box.appendChild(node);

    return nodeInput;
}
  
/**
 * Click to add a new line for filling instructions
 */
function addInstruction() {
  let box = document.getElementById('instructionOrderedList');
  
  instructionIndex += 1;
  let node = document.createElement('LI');  
  node.id = `instructionNode-${instructionIndex}`;
  let nodeInput = document.createElement('input');
  let br = document.createElement('br');
  nodeInput.type='text';
  nodeInput.id = `instruction-${instructionIndex}`;
  nodeInput.autocomplete = 'off';
  nodeInput.appendChild(br);
  node.appendChild(nodeInput);
  let img = document.createElement('img');
  img.id = `delete-instruction-${instructionIndex}`;
  img.className = 'delete';
  img.src = 'assets/images/delete-button.png';
  // Delete the node
  let nodeId = `instructionNode-${instructionIndex}`;
  img.onclick = function(){
    let node = document.getElementById(nodeId);
    node.remove();
  };
  node.appendChild(img);
  box.appendChild(node);

  return nodeInput;
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
      let ingredientText = leftCkbox[i].innerText.trim();
      intolerance_list.push(ingredientText);
    }
  }

  const rightElmt = document.querySelector('.right');
  const rightCkbox = rightElmt.getElementsByClassName('container');
  for(let i = 0; i < rightCkbox.length; i++){
    let ingredientBox = rightCkbox[i].getElementsByTagName('input')[0];
    if(ingredientBox.checked){
      let ingredientText = rightCkbox[i].innerText.trim();
      intolerance_list.push(ingredientText);
    }
  }

  return intolerance_list;
}

/**
 * Get the recipe preference list and show it
 */
function recipePreferences(intolerance_list){
      
    const leftElmt = document.querySelector('.left');
    const leftCkbox = leftElmt.getElementsByClassName('container');
    for(let i = 0; i < leftCkbox.length; i++){
      let ingredientBox = leftCkbox[i].getElementsByTagName('input')[0];
      let ingredientText = leftCkbox[i].innerText.trim();
  
      if(intolerance_list.includes(ingredientText))
        ingredientBox.checked = true;
    }
  
    const rightElmt = document.querySelector('.right');
    const rightCkbox = rightElmt.getElementsByClassName('container');
    for(let i = 0; i < rightCkbox.length; i++){
      let ingredientBox = rightCkbox[i].getElementsByTagName('input')[0];
      let ingredientText = rightCkbox[i].innerText.trim();
  
      if(intolerance_list.includes(ingredientText))
        ingredientBox.checked = true;
    }
  }