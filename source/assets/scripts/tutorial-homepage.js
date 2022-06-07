const tutorial = introJs();

// and check for it when deciding whether to start.
window.addEventListener("load", function () {
  var doneTour = localStorage.getItem("%doneTour") === "yeah!";
  if (doneTour) return;
  else {
    tutorial
      .setOptions({
        tooltipClass: "customTooltip",
        steps: [
          {
            title: "Welcome",
            intro:
              "Welcome to We The Foodies, where you can find or create all the recipes that you want. 👋",
          },
          {
            element: document.querySelector(".nav-bar"),
            intro: "This is the navigation bar. There are 4 options available",
            position: "top",
          },
          {
            element: document.querySelector(".nav-dashboard"),
            intro:
              "This leads to the front page, where it display all the current recipes",
          },
          {
            element: document.querySelector(".nav-search"),
            intro: "This is where you search for any recipes that you want",
          },
          {
            element: document.querySelector(".nav-add"),
            intro: "This is where you add your own recipe",
          },
          {
            element: document.querySelector(".nav-settings"),
            intro: "This is where you can change the setting",
          },
        ],
      })
      .start();
  }
});

// add a flag when we're done
tutorial.oncomplete(function () {
  console.log("$done tutorial");
  localStorage.setItem("%doneTour", "yeah!");
});

// add a flag when we exit
tutorial.onexit(function () {
  localStorage.setItem("%doneTour", "yeah!");
});
