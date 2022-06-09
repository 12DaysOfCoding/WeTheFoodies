const tutorialSearchPage = new window.introJs();

// and check for it when deciding whether to start.
window.addEventListener('load', function () {
  var doneTour = localStorage.getItem('%doneTourSearchPage') === 'yeah!';
  if (doneTour) return;
  else 
    tutorialSearchPage
      .setOptions({
        steps: [
          {
            title: 'Welcome',
            intro: 'This is our search page',
          },
          {
            element: document.querySelector('.search-bar'),
            intro: 'Type in the name of the recipe that you want',
          },
          {
            element: document.querySelector('.diet-restrictionBox'),
            intro: 'Select all the options that you want here',
          },
          {
            element: document.querySelector('.search-button'),
            intro: 'Click search button to start your search',
          },
        ],
      })
      .start();
  
});

// add a flag when we're done
tutorialSearchPage.oncomplete(function () {
  localStorage.setItem('%doneTourSearchPage', 'yeah!');
});

// add a flag when we exit
tutorialSearchPage.onexit(function () {
  localStorage.setItem('%doneTourSearchPage', 'yeah!');
});
