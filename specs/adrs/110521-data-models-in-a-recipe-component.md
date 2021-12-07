Modification (2021-11-26): The final data model is as follows.
- author: String (data from API)
- cuisines: Array (data from API)
- difficulty: Number
- dishTypes: Array (data from API)
- hash: String (hash ID of the recipe)
- ingredients: Array
- intolerances: Array (representing dietary restrictions)
- name: String
- pricePerServing: Number (data from API)
- readyInMinutes: Number
- servings: Number
- steps: Array
- thumbnail: String (the image of the recipe)
- vegan: Boolean
- vegetarian: Boolean

Calories and ratings are deleted since we don't have space to show more information in the expanded card on a mobile device.

# Decision 3: Data Models in a Recipe Component

* Status: accepted
* Deciders: Team Decision
* Date: 2021-11-05

## Context and Problem Statement

We need to decide which data would be included in a recipe component in the recipe application.

## Considered Options

* Name: String
* Calories: Number
* Dietary Preference: Array
* Time to cook: Number
* Ratings: Number
* Steps: Array
* Recipe Difficulty: Number
  1. Easy
  2. Medium
  3. Hard
  4. Very Hard

## Decision Outcome

We will include all the options because they constitute the basic characteristics of a recipe. It also includes the number of calories and dietary preferences for certain users who have previously set any dietary restrictions in the app's settings.

We may add more elements of a recipe afterwards if necessary, and may possibly adjust it to the standardized JSON format.
