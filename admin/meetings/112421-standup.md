# 11/24 Standup
*cse110-fa21-group30*

Time: 11/24/21 1:00 - 1:55 pm

Where: Zoom

## Attendence
- Anna Hsieh
- Bin Ni
- Enze Ma
- Harry Lei
- Jingjing Qiao
- Minjun Xu
- Lexseal Lin
- Yizhou Wang

## Meeting Agenda
- [x] Go through tasks for this week
    - Coding
    - DevOps and general repo clean up
    - Add more recipes
- [x] Go through problems
    - Where to input dietary preferences (onboarding page/search page)
    - Connection between data from API and recipe cards & recipe detail page & foodie mode
    - Position of the navigation bar & coordination with the body
    - Style of recipe add page
    - Codacy
- [x] Distribute tasks
    - Automated tests
        - CI pipeline (Harry Lei)
        - Codacy (Harry Lei)
    - Components
        - Fix Add Recipe Page (Yizhou)
        - Fix Navigation Bar (Bin & Minjun)
        - Fix onboarding page (Bin & Minjun)
        - Font size page (Bin & Minjun)
        - Version page (Bin & Minjun)
    - Testing & Documentation
        - Who did the js, who writes the test & documentation (except navigation bar)
        - You can add more tests (unit & E2E) if you would like.
        - api.js (Enze)
        - foodie.js (Meshach)
        - index.js (Anna)
        - onBoardingPage.js (Minjun)
        - preference-setting.js (Minjun)
        - recipe-add.js (Prothit & Yizhou)
        - recipe-detail.js (Yizhou & Jingjing)
        - recipe-searchPage.js (Minjun & Enze)
        - setting.js (Minjun & Bin)
    - Data & API (Lexseal, Enze, Meshach, Minjun, Prothit)
        - Figure out the storage structure
            - Aux arrays for quick lookups
        - Custom filters for restrictions
        - Search suggestions and fuzzy match

## Tasks Completed
- Went through problems
    - Where to input dietary preferences (onboarding page/search page)
        - Onboarding page: since no change
        - Search page: close to real life when we use recipe app
        - Discussion result: the dietary preferences input on the onboarding page / setting page are permanant and automatically shown when going to the search page. You can still change the preference for one-time search, but the change does not affect the permanant preferences in setting page.
        - p.s. tags are trash for recipe
    - Connection between data from API and recipe cards & recipe detail page & foodie mode
        - No connection logic between API and card/detail - which card is clicked?
    - Position of the navigation bar & coordination with the body
    - Style of recipe add page
    - Codacy
- Delegated tasks between team members
- [Documentation](https://cse110-fa21-group30.github.io/cse110-fa21-group30/) (see more in [README.md](/README.md))
```
/**
 * returns the sum of a and b
 * @param {int} a - first number
 * @param {int} b - second number
 * @return abc
 */
```

## Decisions Made
- Tasks should be completed Sunday night
- Sprint 2 Review: next Monday, right after the weekly standup
- Retrospective: next Tuesday
