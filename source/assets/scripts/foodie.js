// foodie.js

import * as backend from './backend.js';

window.addEventListener('DOMContentLoaded', init);

let currStep = 0;

let steps = [];

async function init() {
  getSteps();

  goDashboard();
  goSearch();
  goAdd();
  goSettings();

  updateStep();

  bindExitButton();

  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');

  bindPrevButton(prevButton, nextButton);
  bindNextButton(prevButton, nextButton);
}

function getSteps() {
  const recipe = backend.get_recipe(backend.get_selected());
  steps = recipe.steps.map((step) => step.step);
}

function updateStep() {
  const stepNum = document.querySelector('#step-num');
  const step = document.querySelector('#step');

  stepNum.textContent = `STEP ${currStep + 1}`;
  step.textContent = steps[currStep];
};

function bindExitButton() {
  const exitBtn = document.getElementById('exit');
  exitBtn.addEventListener('click', () => {
    window.location.replace('recipe-detail.html');
  });
}

function bindPrevButton(prevButton, nextButton) {
  prevButton.classList.add('hidden');
  
  prevButton.addEventListener('click', () => {
    nextButton.classList.remove('hidden');
    if (currStep > 0) currStep -= 1;
    if (currStep === 0) 
      prevButton.classList.add('hidden');
    else 
      nextButton.classList.remove('disabled');
    

    updateStep();
  });
}

function bindNextButton(prevButton, nextButton) {
  nextButton.addEventListener('click', () => {
    prevButton.classList.remove('hidden');
    if (currStep < steps.length - 1) currStep += 1;
    if (currStep === steps.length - 1) 
      nextButton.classList.add('hidden');
    else 
      prevButton.classList.remove('disabled');
    

    updateStep();
  });
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
    window.location.replace('#');
  });
}
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace('settings.html');
  });
}