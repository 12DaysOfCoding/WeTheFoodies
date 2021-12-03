// version.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goBack();
}


function goBack(){
  const btn = document.getElementById('dount');

  btn.addEventListener('click', () => {
    window.location.assign('settings.html');
  });
  
  const btn2 = document.getElementById('white-arrow');
  btn2.addEventListener('click', () => {
    window.location.assign('settings.html');
  });
}
