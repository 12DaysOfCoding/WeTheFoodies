// recipe-add.js
/** @module recipe-add */

window.addEventListener('DOMContentLoaded', init);

import * as backend from './backend.js';

var ingredientIndex = 1;
var instructionIndex = 1;

/**
 * Initialize and call other function
 */
async function init() {
  addIngredient();
  addInstruction();

  goDashboard();
  goSearch();
  goAdd();
  goSettings();
  

  addNewRecipe();

}

/**
 * Add New Recipe to local storage
 */
function addNewRecipe() {
  const form = document.getElementById('add-recipe-form');

  form.addEventListener('submit', (event) => {
      // handle the form data
      console.log("New Recipe Added");

      event.preventDefault();
      let recipe = {};

      const nameField = document.getElementById('recipeName').value;
      recipe.name = nameField;

      const cookingTimeField = document.getElementById('cookingTime').value;
      recipe.readyInMinutes = cookingTimeField;

      const servingSizeField = document.getElementById('servingSize').value;
      recipe.servings = servingSizeField;

      let radios = document.getElementsByName('diff');
      for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          // do whatever you want with the checked radio
          recipe.difficulty = radios[i].value;
          console.log(radios[i].value);
          // only one radio can be logically checked, don't check the rest
          break;
        }
      }

      var veganBox = document.getElementById("vegan");
      if (veganBox.checked == true){
        recipe.vegan = true;
      } else{
        recipe.vegan = false;
      }

      var veggieBox = document.getElementById("veggie");
      if (veggieBox.checked == true){
        recipe.vegetarian = true;
      } else{
        recipe.vegetarian = false;
      }

      //add image ???
      
      let ingredientListLength = document.querySelectorAll("#ingredientOrderedList li").length;;

      let ingredientArr = [];
      console.log(ingredientListLength);

      for(let i = 1; i <= ingredientListLength; i++){
        let str = "ingredient-"+i;
        console.log(str);
        let ing = document.getElementById(str);
        console.log(ing.value);
        let theIngredient = {original:ing.value};
        ingredientArr[i-1] = theIngredient;
      }
      recipe.ingredients = ingredientArr;

      //instruction 
      let instructionListLength = document.querySelectorAll("#instructionOrderedList li").length;;

      let instructionArr = [];
      console.log(instructionListLength);

      for(let i = 1; i <= instructionListLength; i++){
        let str = "instruction-"+i;
        console.log(str);
        let ing = document.getElementById(str);
        console.log(ing.value);
        let step = {number:i, step:ing.value};
        instructionArr[i-1] = step;
      }
      recipe.steps = instructionArr;

      console.log(recipe);

      backend.add_recipe(recipe, true);

      window.location.replace('index.html');

  });
  

}
/**
 * Click to go back to dashboard
 */
function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace('index.html');
  });
}

/**
 * Click to go to search
 */
function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-search.html');
  });
}

/**
 * Click to add the recipe card
 */
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-add.html');
  });
}

/**
 * Click to go to settings
 */
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace('settings.html');
  });
}

/**
 * Click to add a new line for filling ingredients
 */
function addIngredient() {
  let btn = document.getElementById('ingredientButton');
  let box = document.getElementById('ingredientOrderedList');
  console.log('hi');
  
  btn.addEventListener('click', () => {
    console.log('inside');
    ingredientIndex += 1;
    let node = document.createElement('LI');  
    node.id = `ingredientNode-${ingredientIndex}`;
    let nodeInput = document.createElement('input');
    let br = document.createElement('br');
    nodeInput.type='text';
    nodeInput.id = `ingredient-${ingredientIndex}`;
    nodeInput.appendChild(br);
    node.appendChild(nodeInput);
    let img = document.createElement('img');
    img.id = `delete-ingredient-${ingredientIndex}`;
    img.className = 'delete';
    img.src = 'assets/images/delete-button.png';
    img.setAttribute('onClick', 'deleteIngredient(this.id)');
    node.appendChild(img);
    box.appendChild(node);
  });
}

/**
 * Click to add a new line for filling instructions
 */
function addInstruction() {
  let btn = document.getElementById('instructionButton');
  let box = document.getElementById('instructionOrderedList');
  console.log('hiiii');
  
  btn.addEventListener('click', () => {
    console.log('inside');
    instructionIndex += 1;
    let node = document.createElement('LI');  
    node.id = `instructionNode-${instructionIndex}`;
    let nodeInput = document.createElement('input');
    let br = document.createElement('br');
    nodeInput.type='text';
    nodeInput.id = `instruction-${instructionIndex}`;
    nodeInput.appendChild(br);
    node.appendChild(nodeInput);
    let img = document.createElement('img');
    img.id = `delete-instruction-${instructionIndex}`;
    img.className = 'delete';
    img.src = 'assets/images/delete-button.png';
    img.setAttribute('onClick', 'deleteInstruction(this.id)');
    node.appendChild(img);
    box.appendChild(node);
  });
}

/**
 * Click to delete a line for filling ingredients
 * @param {String} deleteImageId - ID of the delete button image at the line
 */
function deleteIngredient(deleteImageId) {
  let id = deleteImageId.substring(18);
  console.log(id);
  let nodeId = 'ingredient-' + id;
  let node = document.getElementById(nodeId);
  node.remove();
}

/**
 * Click to delete a line for filling instructions
 * @param {String} deleteImageId - ID of the delete button image at the line
 */
function deleteInstruction(deleteImageId) {
  let id = deleteImageId.substring(19);
  console.log(id);
  let nodeId = 'instruction-' + id;
  let node = document.getElementById(nodeId);
  node.remove();
}
