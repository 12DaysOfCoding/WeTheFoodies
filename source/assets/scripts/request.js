import { app } from "./api.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

const db = getDatabase(app);

/*function addRecipe(userId) {
  set(ref(db, "users/" + userId), {
    test: "test",
  });
}*/

function getRecipe(userId) {
  const dbRef = ref(db);
  let finalData = null;
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        finalData = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return finalData;
}

/* get recipe by its name */
function getRecipeByName(userId, recipeN) {
  const dbRef = ref(db);
  let finalData = [];
  //const userId = auth.currentUser.uid;
  get(child(dbRef, `users/${userId}/UserRecipies`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().recipeName === recipeN) {
            finalData.push(childSnapshot.val());
          }
        });
        //console.log(snapshot.val());
        //console.log(dataReturn);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return finalData;
}

//let check = getRecipe("123");
//console.log(check);

// Working on adding recipe,
// 2 different types of add
// First type: when user search for a recipe and save to favortie, on backend we save hash from third party api to the database.
// Second type: add recipe normally to the database.

/*
UserId: String
FavoriteRecipes 
    NameOfRecipe: String (Use name search call)
UserRecipes
    NameOfRecipe: String
        Serving: int
        CookTime: int
        Instructions
            Instruction: String
            ...
        DietRestrictions
            RestrictionStatus: boolean
            ... requires client side
            model to be in agreement
*/

// Add recipe to UserRecipes list
function addRecipe(
  userId,
  recipeName,
  Serving,
  cookTime,
  Instructions,
  dietRestrictions
) {
  const currRecipe = ref(db, "users/" + userId + "/UserRecipies");
  const newRecipe = push(currRecipe);
  set(newRecipe, {
    recipeName: recipeName,
    Serving: Serving,
    CookTime: cookTime,
    Instructions: Instructions,
    DietRestrictions: dietRestrictions,
  });
}

/*addRecipe("124", "test", 2, 1, ["test1", "test2"], {
  vegan: true,
  glutenFree: false,
});*/

function addFavorite(userId, hashKey) {
  const currRecipe = ref(db, "users/" + userId + "/FavoriteRecipes");
  const newRecipe = push(currRecipe);
  set(newRecipe, {
    hashKey: hashKey,
  });
}

//addFavorite("123", "dafkjafk");
