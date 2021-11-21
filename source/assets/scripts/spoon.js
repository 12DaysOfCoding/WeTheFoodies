// Parameter:
// Name: the name of the recipe
// it will fetch the reicpe that contain the same word, If it can't find the recipe, then it will return undefiened
// it will include analyze instruction and ingredient data 
async function search_recipe_name(name){
  let response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=486eca841c6a49b896486723439f9977&addRecipeInformation=true&fillIngredients=true`);
  let data=await response.json();
  console.log(data);
  return data.results;
}

// Parameter:
// Name: the name of the recipe
// heal: the filter we set, pass a comma-seperate string of what kind of filter we applied
// it will fetch the reicpe that satify both parameters If it can't find the recipe, then it will return undefiened.
// it will include analyze instruction and ingredient data 
async function search_recipe_name_health(name,health)//health is an array
{
  let response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&intolerances=${health}&apiKey=486eca841c6a49b896486723439f9977&addRecipeInformation=true&fillIngredients=true`);
  let data=await response.json();
  return data.results;
}
search_recipe_name('chicken').then(value=>{
    let a = value;
    console.log(a);
  });
    
search_recipe_name_health('chicken','dairy-free').then(value=>{
    let a = value;
    console.log('test3');
    console.log(a);
  });