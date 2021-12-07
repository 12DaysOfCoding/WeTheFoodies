Modification (2021-11-26): The final data model is as follows.
* intolerances: Array (representing dietary restrictions)
* selected_recipe: String (last visited recipe)
  * Convenient for save recipe feature and foodie feature to get which recipe to use
* favorite_recipes: Array
* custom_recipes: Array (added recipes)
  * Record the recipes the user added in the app so that those added recipes can be shown in the dashboard
* not_first_visit: Boolean (true if not first visit)
  * Decide whether to jump to onboarding page

Consumed calories variable, Points collected variable and current level variable are removed because we decided to build an app which just provide recipe information instead of an interactive recipe app.

# Decision 2: Data Models in a User Object

* Status: accepted
* Deciders: Team Decision
* Date: 2021-11-05

## Context and Problem Statement

We need to decide which data would be included in a user object in the recipe application.

## Considered Options

* Name: String
* Consumed Calories: Number
* Dietary Preferences: Array
* Liked (saved) recipes: Array
* Points Collected: Number
* Current level: String

## Decision Outcome

We will include all the options listed above because they constitute the basic characteristics of a user. Consumed calories would help the users with diet regimens, or any of those who are regulating their caloric intake. Dietary preferences would ensure that the meals displayed take into account any restrictions or allergies they have. Current level and the points collected would encourage users to accumulate points and advance to higher ranks.
