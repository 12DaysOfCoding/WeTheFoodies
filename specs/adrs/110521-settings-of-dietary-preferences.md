Modification (2021-12-01): Delete options of Egg-free, Fish-free, and Shell-fish free. Add one option of Seafood-free.
- It is hard to distinguish egg and dairy based on the API we use, so we just combine them as dairy.
- It is hard to distinguish the shellfish and fish based on the API we use, so we just combine them as seafood.


# Decision 4: Settings of Dietary Preferences

* Status: accepted
* Deciders: Team Decision
* Date: 2021-11-05

## Context and Problem Statement

We need to decide the different dietary preferences that we would provide in the recipe application.

## Considered Options

* Vegan
* Vegetarian
* Dairy-free
* Egg-free
* Gluten-free
* Tree Nut-free
* Peanut-free
* Fish-free
* Shellfish-free
* Soy-free

## Decision Outcome

We will include all the options because they cover most of the dietary preferences our users would have. They will be implemented into arrays in the user objects & recipe components to identify the dietary preference of a user/recipe.
