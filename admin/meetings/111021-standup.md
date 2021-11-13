# 11/10 Standup
*cse110-fa21-group30*

Time: 11/10/21 1:00 - 1:50 pm

Where: Zoom

## Attendence
- Anna Hsieh
- Harry Lei
- Jingjing Qiao
- Meshach Adoe
- Minjun Xu
- Yizhou Wang

## Meeting Agenda
- [x] Summary of tasks for last week
    - Finalize Interface Design
    - Frontend – developing basic components
    - API
    - Testing
    - ADR Documentations
- [x] Go through tasks for this week
    - Coding
    - Polish User Interface
    - Design test cases
    - Come up with more features (maybe)
- [x] Distribute tasks
- [x] Create daily standup system

## Tasks Completed
- Summary of tasks for last week
    - Finalize Interface Design
        - [Figma](https://www.figma.com/file/YidsNPzS9RpxIiGDPfBA27/Wireframes?node-id=125%3A52)
    - Frontend – developing basic components
    - API
        - [Recipe Search API](https://developer.edamam.com/edamam-recipe-api)
        - [spoonacular API](https://spoonacular.com/food-api)
        - We are doing an offline app with local browser storage. It doesn't make sense to connect with some external site only to grab 3-4 starter recipes. We can just do it manually.
        - [Data serialization and basic functions](https://docs.google.com/document/d/1LA9O4pCBvLw2kszhT3vIt6CAa_fWddGTQsYpda5Lcho/edit)
    - Testing
        - [GitHub](https://github.com/cse110-fa21-group30/cse110-fa21-group30/tree/main/tests)
    - ADR Documentations
        - [GitHub](https://github.com/cse110-fa21-group30/cse110-fa21-group30/tree/main/specs/adrs)
- Tasks for this week
    - Setup build pipeline with Netlify/Heroku
        - Practice pull requests and bugs within the whole team
        - Setup HTML formatting, linting, validation
        - Add linting/formatter
        - Branches
            - Production
            - Staging (can be helped with Netlify)
    - Build components
        - Dashboard
            - Recipe Card 
            - Expanded Recipe Card
        - Recipe Search Page
            - Search/filter functionality
        - Recipe Detail Page
            - Expanded Recipe Card
            - Ingredients/Instructions
        - Foodie Mode
        - Navigation Bar
    - Data handling
        - Pulling from API
        - Creating user object
        - Recipe history -> add to user object
    - Define documentation/code standard
        - Add code styling standard
        - Demonstrate standard for JS documentation
        - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
        - [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
    - Finalize remaining interface designs
        - Landing page
- Created issues on GitHub for tasks
- Delegated tasks between team members:
    - [Setup build pipeline with Netlify/Heroku](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/31)
        - Harry
        - Lexseal
    - Build components
        - [Dashboard](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/27) & [Recipe Cards](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/25) & [Expanded Recipe Cards](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/26)
            - Meshach
            - Anna
        - [Recipe Search Page](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/28)
            - Minjun
            - Enze
        - [Recipe Detail Page](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/30)
            - Yizhou
            - Jingjing
        - [Foodie Mode](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/32)
            - Meshach
            - Prothit
        - [Navigation Bar](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/29)
            - Minjun
            - Bin
    - [Data handling](https://github.com/cse110-fa21-group30/cse110-fa21-group30/issues/33)
        - Enze
        - Meshach
    - Define documentation/code standard
        - Meshach
        - Yizhou
    - [Finalize remaining interface designs](https://www.figma.com/file/YidsNPzS9RpxIiGDPfBA27/Wireframes?node-id=125%3A52)
        - Meshach
        - Prothit
- Created daily standup for Thur, Fri, Sat, Sun every week

## Decisions Made
- Code standard should be done tomorrow
- Recipe cards should be done soon (before other tasks)
- Other tasks should be done on next Monday
