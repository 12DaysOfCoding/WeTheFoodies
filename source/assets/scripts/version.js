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
}