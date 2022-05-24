introJs()
  .setOptions({
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
