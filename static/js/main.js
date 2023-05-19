//GLOBAL VARIBALES
var //selector vars
  main_window = $(window),
  root = $("html, body"),
  bdyOnePage = $("body.landing-page-demo "),
  pageHeader = $("#page-header"),
  navMain = $("nav.main-navbar"),
  navMenuWraper = $(".navbar-menu-wraper"),
  hasSubMenu = $(".has-sub-menu"),
  onePage_navLink = $(
    ".landing-page-demo .main-navbar .nav-link, .landing-page-demo .goto-link"
  ),
  pageHero = $("#page-hero"),
  backToTopButton = $(".back-to-top"),
  // Measurements vars
  navMainHeight = navMain.innerHeight(),
  pageHeroHeight = pageHero.innerHeight(),
  //class Names Strings vars

  hdrStandOut = "header-stand-out";
// condetionals vars

$(function () {
  "use strict";

  /*----------------- End Calling global function -----------------*/

  // to remove class from navbar if the page refreshed and the scrolltop of the window > 50px
  if (main_window.scrollTop() > 100) {
    $(pageHeader).toggleClass(hdrStandOut);
    $(backToTopButton).toggleClass("show");
  }

  /* ----------------- End page loading Actions * ----------------- */

  /* ----------------- Start onClick Actions * ----------------- */

  //  Start Smooth Scrolling To page Sections
  $(onePage_navLink).on("click", function (e) {
    var link = $(this).attr("href");
    var currentMainNavHeight = navMain.innerHeight();

    if (link.charAt(0) === "#") {
      e.preventDefault();
      var target = this.hash;
      $(root).animate(
        {
          scrollTop: $(target).offset().top - currentMainNavHeight + 1,
        },
        500
      );
    }
  });

  //End Smooth Scrolling To page Sections

  $(".navbar-nav").on("click", function (e) {
    e.stopPropagation();
  });

  //  open and close menu btn
  $(".menu-toggler-btn, .navbar-menu-wraper ").on("click", function () {
    $(".menu-toggler-btn").toggleClass("close-menu-btn");
    navMenuWraper.toggleClass("show-menu");

    //  add/remove  .header-stand-out  class to .main-navbar when menu-toogler-clicked

    //  if the menu is opened
    if ($(".show-menu").length) {
      // add .header-stand-out class to .main-nav
      if (!pageHeader.hasClass(hdrStandOut))
        $(pageHeader).addClass(hdrStandOut);
    } else {
      // remove .header-stand-out class to .main-nav in case the window scrolltop less than 50px
      if (
        pageHeader.hasClass(hdrStandOut) &&
        main_window.scrollTop() < 50 &&
        main_window.innerWidth > "991px"
      )
        $(pageHeader).removeClass(hdrStandOut);
    }
  });

  //showing navbar sub-menus
  hasSubMenu.on("click", function (e) {
    e.stopPropagation();
    if (!(main_window.innerWidth() > 1199)) {
      $(this).children(".sub-menu").slideToggle();
    }
  });

  // Start Smooth Scrolling To Window Top When Clicking on Back To Top Button
  $(backToTopButton).on("click", function () {
    root.animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
  // End Smooth Scrolling To Window Top When Clicking on Back To Top Button

  /* ----------------- End onClick Actions ----------------- */

  /* ----------------- Start onScroll Actions ----------------- */

  main_window.on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      //show back to top btn
      backToTopButton.addClass("show");
    } else {
      //hide back to top btn
      backToTopButton.removeClass("show");
    }
  });

  /* ----------------- End onScroll Actions ----------------- */

  /* ----------------- Start Window Resize Actions ----------------- */

  /* ----------------- End Window Resize Actions ----------------- */

  /* --------------------------
    Start Vendors plugins options  
    ----------------------------*/

  /* Start fancybox Options */
  if ($("*").fancybox) {
    $().fancybox({
      selector: '[data-fancybox=".filter"]:visible',
      loop: true,
      buttons: ["zoom", "close"],
    });
  }

  /* Start bootstrap Scrollspy Options  */
  /*-------------------------------------*/
  //on one page demos only
  $(bdyOnePage).scrollspy({
    target: navMain,
    offset: navMainHeight + 1,
  });

  /* Start  wow.js  Options */
  var wow = new WOW({
    animateClass: "animated",

    offset: 100,
  });
  wow.init();
  /*----------------- End Vendors plugins options ----------------- */

  $("#loading-screen").fadeOut(500);
});
