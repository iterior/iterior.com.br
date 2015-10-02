$(document).ready(function () {

  // rollover nav
  $('.side-nav li a').click(function (e) {
    e.preventDefault();
    var $this = $(this);
    var anchor = $($this.attr('href'));
    $('body').animate({scrollTop: anchor.position().top}, 1200);
  });
  // Show side-nav
  $('.button-collapse').sideNav({
    edge: 'right',
    closeOnClick: true
  });

  // Modal form subscribe
  $('.subscribe-form').leanModal({
    dimissible: true
  });
});
