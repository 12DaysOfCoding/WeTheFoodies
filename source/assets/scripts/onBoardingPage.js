// onBoardingPage.js

import * as backend from './backend.js'

window.addEventListener('DOMContentLoaded', init);

async function init() {
  begin();
}

function begin() {
  const btn = document.querySelector('.save');
  //   const text = document.getElementById('begin-text');
  let intolerance_list = [];

  btn.addEventListener('click', () => {
    //Add the intolerance list into local store before move to the dashboard
    const leftElmt = document.querySelector('.left');
    const leftCkbox = leftElmt.getElementsByClassName("container");

    //leftCkbox[0].getElementsByTagName("input")[0].checked

    for(var i = 0; i < leftCkbox.length; i++){
      var ingredientBox = leftCkbox[i].getElementsByTagName("input")[0];
      if(ingredientBox.checked){
        var ingredientText = leftCkbox[i].innerText;
        intolerance_list.push(ingredientText);
      }
    }

    const rightElmt = document.querySelector('.right');
    const rightCkbox = rightElmt.getElementsByClassName("container");
    for(var i = 0; i < rightCkbox.length; i++){
      var ingredientBox = rightCkbox[i].getElementsByTagName("input")[0];
      if(ingredientBox.checked){
        var ingredientText = rightCkbox[i].innerText;
        intolerance_list.push(ingredientText);
      }
    }

    backend.set_intolerance(intolerance_list);
    window.location.replace('index.html');
  });
}
