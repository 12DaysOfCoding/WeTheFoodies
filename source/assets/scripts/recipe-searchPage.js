// recipe-searchPage.js

import * as backend from './backend.js';

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goDashboard();
  goSearch();
  goAdd();
  goSettings();
  
  defaultPreference();
  readPreference();

  // sample usage of the search_recipe function
  const search_button = document.getElementById('search-button');
  // search_button.addEventListener('click', () => {
  //   const input = document.getElementById('search-field').value;
  //   // backend.search_recipe(input).then(res => {
  //   //   console.log(res)
  //   // });
  //   // backend.search_recipe(input, true).then(console.log);  // use this for online search
  
  //   // console.log(backend.fetch_recipe("egg")[0].ingredientText[0]);
  //   // backend.filter_intolerance("11").then(console.log());
  // });

  // sample usage of the auto_suggest function
  const input_field = document.getElementById('search-field');
  input_field.addEventListener('input', function() {
    const input = this.value;
    backend.search_suggest(input).then(console.log);
  });

  // Create a recipe card with mock data
  let recipeCard = document.createElement('recipe-card');
  recipeCard.data = {};
  document.querySelector('.recipes__wrapper').appendChild(recipeCard);
  //set the default filter
  defaultPreference();
  // clear the prior output
  let recipe_list=document.querySelector('.recipes__wrapper');
  recipe_list.innerHTML='';
  //select the button
  //once the button got clicked, request the data from api and then output the result
  let button=document.querySelector('#search-button');
  button.addEventListener('click',()=>{
    let list=readPreference();
    let recipe_name=document.querySelector('#search-field').value;
    backend.search_recipe(recipe_name,list).then(data => {
      for(let i=0; i<data.length; i++){
        let recipeCard = document.createElement('recipe-card');
        console.log(backend.get_recipe(data[i]));
        recipeCard.data = backend.get_recipe(data[i]);
        document.querySelector('.recipes__wrapper').appendChild(recipeCard);
      }
    });
  });

}

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

function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace('index.html');
  });
}

function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-search.html');
  });
}
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-add.html');
  });
}
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace('settings.html');
  });
}