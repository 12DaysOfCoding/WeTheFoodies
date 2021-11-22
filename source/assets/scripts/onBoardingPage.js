// onBoardingPage.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  begin();
}

function begin() {
  const btn = document.querySelector('.save');
//   const text = document.getElementById('begin-text');

  btn.addEventListener('click', () => {
    window.location.replace("index.html");
  });
}
