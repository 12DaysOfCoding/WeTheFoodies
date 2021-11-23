// Parameter:
// Name: the name of the recipe
// it will fetch the reicpe that contain the same word, If it can't find the recipe, then it will return undefiened
// it will include analyze instruction and ingredient data 
async function search_recipe_name(name){
  let response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=486eca841c6a49b896486723439f9977&addRecipeInformation=true&fillIngredients=true`);
  let data=await response.json();
  let temp=data.results
  return_list=new Array();
  localStorage.clear();
  for( let i=0; i<temp.length;i++){
  let temp2={'Recipe hash':temp[i].id,
              'Name':temp[i].title,
              'imageType':temp[i].imageType,
              'Thumbnail':temp[i].image,
              'Author':temp[i].sourceName,
              'Type':temp[i].dishTypes,
              //'Difficulty':
              'Ingredients':temp[i].extendedIngredients,//notice that the ingredient is not string, but a array of object, because it has a lot info
              'Intolerances':temp[i].diets,//notice that the intolerence is not string, but a array
              'Steps:':temp[i].analyzedInstructions[0].steps
            };
    set_localstore(temp2["Recipe hash"],temp2);
    return_list.push(temp2)
  }
  return return_list;
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
  let temp=data.results
  return_list=new Array();
  localStorage.clear();
  for( let i=0; i<temp.length;i++){
  let temp2={'Recipe hash':temp[i].id,
              'Name':temp[i].title,
              'imageType':temp[i].imageType,
              'Thumbnail':temp[i].image,
              'Author':temp[i].sourceName,
              'Type':temp[i].dishTypes,
              //'Difficulty':
              'Ingredients':temp[i].extendedIngredients,//notice that the ingredient is not string, but a array of object, because it has a lot info
              'Intolerances':temp[i].diets,//notice that the intolerence is not string, but a array
              'Steps:':temp[i].analyzedInstructions[0].steps
            };
    set_localstore(temp2["Recipe hash"],temp2);
    return_list.push(temp2)
  }
  return return_list;
}

// Parameter:
// recipe_name: the recipe name 
// it will automaticlt get and parse the recipe in local storage if it can't find it it will just print a sentence to console,.
function get_info_localstore(recipe_name){
  if(localStorage.getItem(recipe_name)) {
    return JSON.parse(localStorage.getItem(recipe_name));
  } else {
    console.log('Can not find recipe info in local,can not get');
  }
}

// Parameter:
// recipe_name: the recipe name 
// recipe_info: the recipe object
// it will automaticlt change the info to string and store it in the local storage, 
// if locale storage already have it it will just print a sentence to console.
function set_localstore(recipe_name,recipe_info){
  if(!localStorage.getItem(recipe_name)) {
    localStorage.setItem(recipe_name,JSON.stringify(recipe_info));
  } else {
    console.log('Already Saved this recipe before,can not save it again');
  }
}

// Parameter:
// recipe_name: the recipe name 
// it will automaticlt remove the recipe in local storage if it can't find it it will just print a sentence to console,.
function remove_localstore(recipe_name){
  if(localStorage.getItem(recipe_name)) {
    localStorage.removeItem(recipe_name);
  } else {
    console.log('Do not have recipe info in local, can not remove');
  }
}
  
// Parameter:
// id: id of the recipe
// add recipe to favorite list
function add_favorite(id){
  let fav=get_info_localstore('favorite');
  if(fav==undefined){
    let temp=new Array(0);
    temp.push(id);
    set_localstore('favorite',temp);
  }
  else{
    if(fav.indexOf(id)==-1){
      fav.push(id);
      remove_localstore('favorite');
      set_localstore('favorite',fav)
    }
    else{
      console.log('Add: Recipe already in the favorite list');
    }
  }
}

// Parameter:
// id: id of the recipe
// remove recipe to favorite list
function remove_favorite(id){
  let fav=get_info_localstore('favorite');
  if(fav==undefined){
    console.log('Favorite list is empty');
  }
  else{
    let index=fav.indexOf(id)
    if(index==-1)
    {
      console.log('Remove: Recipe not in the favorite list');
    }
    else{
     fav.splice(index,1);
     remove_localstore('favorite');
     set_localstore('favorite',fav)
    }
  }
}

// Parameter:
// id: id of the recipe
// add recipe to custom added list
function add_custom(id){
  let added=get_info_localstore('custom');
  if(added==undefined){
    let temp=new Array(0);
    temp.push(id);
    set_localstore('custom',temp);
  }
  else{
    if(added.indexOf(id)==-1){
      added.push(id);
      remove_localstore('custom');
      set_localstore('custom',added)
    }
    else{
      console.log('Add: Recipe already in the custom list');
    }
  }
}

// Parameter:
// id: id of the recipe
// remove recipe to custom added list
function remove_custom(id){
  let added=get_info_localstore('custom');
  if(added==undefined){
    console.log('Custom list is empty');
  }
  else{
    let index=added.indexOf(id)
    if(index==-1)
    {
      console.log('Remove: Recipe not in the cuntom list');
    }
    else{
     added.splice(index,1);
     remove_localstore('custom');
     set_localstore('custom',added)
    }
  }
}




//if recipe can't be founded, the value will be undefined
// a few sample to show how to use it
// some example and test below
// search_recipe_name('chicken').then(value=>{
//   let a = value;
//   console.log('test')
//   console.log(a)
//   console.log(get_info_localstore(a[0]["Recipe hash"]))
// });
  

// search_recipe_name_health('chicken','dairy-free').then(value=>{
//   let a = value;
//   console.log('test3');
//   console.log(a);
// });

// localStorage.clear();
// console.log('fav test')
// add_favorite('1412414');
// console.log(get_info_localstore('favorite'));
// add_favorite('12421421515');
// console.log(get_info_localstore('favorite'));
// add_favorite('12421421515');
// console.log(get_info_localstore('favorite'));
// remove_favorite('afsafafaf')
// console.log(get_info_localstore('favorite'));
// remove_favorite('12421421515')
// console.log(get_info_localstore('favorite'));

// console.log('cus test')
// add_custom('1412414');
// console.log(get_info_localstore('custom'));
// add_custom('12421421515');
// console.log(get_info_localstore('custom'));
// add_custom('12421421515');
// console.log(get_info_localstore('custom'));
// remove_custom('afsafafaf')
// console.log(get_info_localstore('custom'));
// remove_custom('12421421515')
// console.log(get_info_localstore('custom'));


