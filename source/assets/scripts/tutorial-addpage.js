const tutorialAddPage = introJs();

// and check for it when deciding whether to start.
window.addEventListener("load", function () {
  var doneTour = localStorage.getItem("doneTourAddPage") === "yeah!";
  if (doneTour) return;
  else {
    tutorialAddPage
      .setOptions({
        tooltipClass: "customTooltip",
        steps: [
          {
            title: "Welcome",
            intro: "This is the place where you add your own recipe",
          },
          {
            element: document.querySelector(".basic"),
            intro: "Type in all the necessary information here",
            position: "top",
          },
          {
            element: document.querySelector(".radioClass"),
            intro: "Select the option you want",
          },
          {
            element: document.querySelector(".diet-restrictionBox"),
            intro: "Select the diet options you want",
          },
          {
            element: document.querySelector(".bottom-boxes"),
            intro: "This is where you add your own recipe",
          },
        ],
      })
      .start();
  }
});

// add a flag when we're done
tutorialAddPage.oncomplete(function () {
  localStorage.setItem("doneTourAddPage", "yeah!");
});

// add a flag when we exit
tutorialAddPage.onexit(function () {
  localStorage.setItem("doneTourAddPage", "yeah!");
});
