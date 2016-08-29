// Open mobile-nav
var mobileButtonOpen = document.querySelector('.mobile-button');
mobileButtonOpen.addEventListener('click', function(event) {
  event.preventDefault();
  var nav = document.querySelector('header.header nav');

  if (nav.className.indexOf('--open') > -1) {
  closeNav(nav);
  } else {
    nav.className = nav.className + '--open';
  }
});

// Close mobile-nav
var mobileButtonClose = document.querySelector('.mobile-button.--close');
mobileButtonClose.addEventListener('click', function(event) {
  event.preventDefault();
  var nav = document.querySelector('header.header nav');
  closeNav(nav);
});

// Add event mobile-nav close to links
var mobileNavButtonLink = document.querySelector('header.header nav').getElementsByTagName('a');
for (var i=0; i<mobileNavButtonLink.length; i++) {
  mobileNavButtonLink[i].addEventListener('click', function(event) {
    var nav = document.querySelector('header.header nav');
    closeNav(nav);
  });
}

function closeNav(nav) {
  nav.className = nav.className.replace('--open', '');
}

