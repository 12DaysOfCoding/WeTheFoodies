// version.js

if (localStorage.getItem('%not_first_visit')) 
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect


async function init() {
  goBack();
}


function goBack(){
  const btn = document.getElementById('white-arrow-p');
  btn.addEventListener('click', () => {
    window.location.assign('settings.html');
  });
}
