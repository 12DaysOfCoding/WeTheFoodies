# Decision 5: Pull requests

* Status: accepted
* Deciders: Lexseal
* Date: 2021-11-15

## Context and Problem Statement

We need to decide a standard operation procedure when adding a feature.

## Considered Options

* Create a new branch, then create a pull request. Wait for others' approval & passing automated tests.

## Decision Outcome

We will accept this option so that ```main``` is seldom broken and someone else can take a look at your code. Also, this can ensure that the program passes the test after it is added in the main branch.

The pull request template is as follows:

```
### Features Added/Issues Addressed
_e.g. Fixed issue #12 UI overlay issue when scrolling ..._

### Brief Description of Solution
_e.g. Moved divider up and ..._

### Checklist
- [ ] Added new tests (You know the code best to make new tests)
- [ ] Resolved merge conflicts (Prefer merge over rebase)
- [ ] Status check passed (Linted and tested)
- [ ] Reviewed (At least one reviewer's approval)

### Caveat/Special Instructions for Team
_ex. need to run `abc` to install `xyz` ..._
```

[Rendered Output](../../.github/pull_request_template.md)
