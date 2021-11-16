// foodie.js
  
window.addEventListener('DOMContentLoaded', init);

let currStep = 0;

const steps = [
  'Melt butter',
  'Bring cookie',
  'Buy food'
];
  
async function init() {
  updateStep();

  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');

  prevButton.addEventListener('click', () => {
    if (currStep > 0) currStep -= 1; 
    if (currStep === 0) {
      prevButton.classList.add('hidden');
    } else {
      nextButton.classList.remove('disabled');
    }

    updateStep();
  });

  nextButton.addEventListener('click', () => {
    if (currStep < steps.length - 1) currStep += 1;
    if (currStep === steps.length) { 
      nextButton.classList.add('hidden');
    } else {
      prevButton.classList.remove('disabled');
    }
    
    updateStep();
  });
}

const updateStep = () => {
  const stepNum = document.querySelector('#step-num');
  const step = document.querySelector('#step');

  stepNum.textContent = `STEP ${currStep + 1}`;
  step.textContent = steps[currStep];
};
  
