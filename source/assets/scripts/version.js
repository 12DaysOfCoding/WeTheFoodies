// version.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goBack();
}


function goBack(){
  const btn = document.getElementById('white-arrow-p');
  btn.addEventListener('click', () => {
    window.location.assign('settings.html');
  });
}
