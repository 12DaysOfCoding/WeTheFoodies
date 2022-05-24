introJs()
  .setOptions({
    tooltipClass: "customTooltip",
    steps: [
      {
        title: "Welcome",
        intro: "This is our search page",
      },
      {
        element: document.querySelector(".search-bar"),
        intro: "Type in the name of the recipe that you want",
      },
      {
        element: document.querySelector(".diet-restrictionBox"),
        intro: "Select all the options that you want here",
      },
      {
        element: document.querySelector(".search-button"),
        intro: "Click search button to start your search",
      },
    ],
  })
  .start();
