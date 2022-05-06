# Decision : User account preference

* Status: accepted
* Deciders: Team Decision
* Date: 2022-05-06

## Context and Problem Statement

We want the user to have the ability to use their recipes anywhere they go. This requires user authentification.

## Considered Options

<ul>
  <li>Allow user to freely use our application, both local (with no account created) and on server.</li>
    <ul>
        <li> Pros
            <ul>
                <li>User can have the freedom to do what they want
                <li>Added work for backend
            </ul>
        <li> Cons
            <ul>
                <li>User cannot have their recipes used on multiple devices
            </ul>
    </ul>

  <li>Force user to create an account to use our application
    <ul>
        <li> Pros
            <ul>
                <li>User can use their recipes on multiple devices
                <li>Not as back-end heavy as the first option
            </ul>
        <li> Cons
            <ul>
                <li>Not everyone likes to create an account (potentially decrease UI)
            </ul>
    </ul>
  </li>
</ul>

## Decision Outcome

Generally, the first option fits our values better. However, due to time constrain, we choose to go with the 2nd option: force the user to create and account. After we manage to get it works well, we could procede with some changes to make our application works with option 1.
