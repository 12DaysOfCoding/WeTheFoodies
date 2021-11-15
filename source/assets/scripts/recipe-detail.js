// recipe-detail.js
  
window.addEventListener('DOMContentLoaded', init);
  
async function init() {

  // Create a recipe card with mock data
  let expandedRecipeCard = document.createElement('expanded-recipe-card');
  expandedRecipeCard.data = {};
  document.querySelector('.recipe-detail__wrapper').appendChild(expandedRecipeCard);

  saveOrSaved();
}

function saveOrSaved() {
  const btn = document.querySelector('.save');
  const heart = document.getElementById('heart');
  const text = document.getElementById('save-or-not');

  btn.addEventListener('click', () => {
    if (text.textContent === 'SAVE') {
      text.textContent = 'SAVED';
      heart.src = 'assets/images/heart1.svg';
    } else {
      text.textContent = 'SAVE';
      heart.src = 'assets/images/heart0.svg';
    }
  });
}
