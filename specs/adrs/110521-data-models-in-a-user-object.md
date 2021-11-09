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
