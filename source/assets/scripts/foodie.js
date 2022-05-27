// foodie.js

import * as backend from './backend.js';

if (localStorage.getItem('%not_first_visit')) 
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect


let currStep = 0;

let steps = [];

const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

async function init() {
  getSteps();
  updateStep();

  bindExitButton();
  
}

function getSteps() {
  const recipe = backend.get_recipe(backend.get_selected());
  steps = recipe.steps.map((step) => step.step);
  if (steps.length === 1) {
    prevButton.classList.add('hidden');
    nextButton.classList.add('hidden');
  } else {
    bindPrevButton(prevButton, nextButton);
    bindNextButton(prevButton, nextButton);
  }
}

function bindExitButton() {
  const exitBtn = document.getElementById('white-arrow-p');
  exitBtn.addEventListener('click', () => {
    window.history.back();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape')
      window.history.back();
  });
}

function bindPrevButton(prevButton, nextButton) {
  prevButton.classList.add('hidden');
  prevButton.addEventListener('click', goToPrevStep);
  
  document.addEventListener('keydown', (event)=>{
    if (event.defaultPrevented)
      return;
    if (event.key === 'ArrowLeft')
      goToPrevStep();
  });
}

function goToPrevStep() {
  nextButton.classList.remove('hidden');
    if (currStep > 0) currStep -= 1;
    if (currStep === 0) 
      prevButton.classList.add('hidden');
    else 
      nextButton.classList.remove('disabled');

    updateStep();
}

function bindNextButton(prevButton, nextButton) {
  nextButton.addEventListener('click', goToNextStep);

  document.addEventListener('keydown', (event)=>{
    if (event.defaultPrevented)
      return;
    if (event.key === 'ArrowRight')
      goToNextStep();
  });
}

function goToNextStep() {
  prevButton.classList.remove('hidden');
  if (currStep < steps.length - 1) currStep += 1;
  if (currStep === steps.length - 1) 
    nextButton.classList.add('hidden');
  else 
    prevButton.classList.remove('disabled');

  updateStep();
}

const updateStep = () => {
  const stepNum = document.querySelector('#step-num');
  const step = document.querySelector('#step');

  stepNum.textContent = `STEP ${currStep + 1}`;
  step.textContent = steps[currStep];
};
