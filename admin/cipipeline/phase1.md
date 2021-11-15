## Lists of features that are planed for implementation:
- [x] Linting and code style enforcement
- [x] Code quality via tool
- [x] Code quality via human review
- [x] Unit tests via automation
- [ ] Documentation generation via automation
- [ ] End to end testing

## Lists of tools used for this CI/CD Pipeline:
- Codacy
- ESLint
- Jest
- npm
- Node.js
- Github Actions
- Github pull request

## Explaination for each feature:
- **Linting and code style enforcement:** We use ESLint for linting and style enforcement, which can be customized to be well fitted for a variedty of types of coding files. Linting is useful for flaging programming errors and stylistic errors, such as inconsistency in terms of quotations marks or variables that are declared but never used. When new pull requests are created, the raw code would be linted first to minimize number of bugs and to make sure that the style can remain consistent in this repo. 


- **Unit test:** After the pull requests has been checked for linting and style enforcement, a series of unit test would automatically run on the given pull request to see if desiered fucntions regarding the recipe management application can be fulfilled. Unlike E2E tests, units tests usually only test certain features of the application and would not require the application to run perfectly end to end, thus allowing us to implement small improvements piece by piece rather than finishing the entire application in one push. 


- **Human review**: After a series of checks and tests are performed on the given pull request, the approval of this pull requst depends on human review, which is performed by our team members. By enforcing such practice, conflicts among different pull requests can be forstalled and the final product presented in the repo would be better organized. Also, human reviews make sure that all desired features are covered, and new features that don't have test cases yet can be manually tested.
