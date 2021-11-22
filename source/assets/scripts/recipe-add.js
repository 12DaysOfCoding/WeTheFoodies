//recipe-add.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
    addIngredient();
    addInstruction();



}

function addIngredient() {
    const btn = document.getElementById('ingredientButton');
    const box = document.getElementById('ingredientOrderedList');
    console.log('hi');
  
    btn.addEventListener('click', () => {
        console.log('inside');
        let node = document.createElement("LI");  
        let nodeInput = document.createElement("input");
        let br = document.createElement('br');
        nodeInput.type='text';
        nodeInput.appendChild(br);
        node.appendChild(nodeInput);
        box.appendChild(node);
      
    });
}

function addInstruction() {
    const btn = document.getElementById('instructionButton');
    const box = document.getElementById('instructionOrderedList');
    console.log('hiiii');
  
    btn.addEventListener('click', () => {
        console.log('inside');
        let node = document.createElement("LI");  
        let nodeInput = document.createElement("input");
        let br = document.createElement('br');
        nodeInput.type='text';
        nodeInput.appendChild(br);
        node.appendChild(nodeInput);
        box.appendChild(node);
      
    });
}