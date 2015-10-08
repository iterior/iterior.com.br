jQuery(document).ready(function () {

  // rollover nav
  jQuery('.side-nav li a').click(function (e) {
    e.preventDefault();
    var $this = jQuery(this);
    var anchor = jQuery($this.attr('href'));
    jQuery('html, body').animate({scrollTop: anchor.position().top}, 1200);
  });
  // Show side-nav
  jQuery('.button-collapse').sideNav({
    edge: 'right',
    closeOnClick: true
  });

  // Modal form subscribe
  jQuery('.subscribe-form').leanModal({
    dimissible: true
  });
});
