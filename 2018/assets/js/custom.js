$(document).ready(function() {
   //Redirect to https. Hacky, but we shouldn't be using Heroku for a static site
  //if (window.location.protocol == "http:") {
    //window.location.replace("https://2018.writespeakcode.com/");
  //}

// Enable events on map once you click map
  $('.venue-info-map').click(function () {
    $('.venue-info-map iframe').css("pointer-events", "auto");
  });

  $( ".venue-info-map" ).mouseleave(function() {
    $('.venue-info-map iframe').css("pointer-events", "none");
  });

  // Toggle Speaker Bios
  $(".gridder").gridderExpander({
    scroll: true,
    scrollTo: "listitem", // "panel" or "listitem"
    scrollOffset: 68,
    animationSpeed: 500,
    animationEasing: "easeInOutExpo",
    showNav: false
  });

});

//sticky desktop nav bar
$(function() {
    //sticky nav located under coutdown, sticks to top on scroll
    var navBar = $('.middleHeader');
    var pageIntroHeight = $('.page-intro').height();
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= pageIntroHeight + 48) {
            navBar.removeClass('middleHeader').addClass('stickyHeader');
        } else {
            navBar.removeClass('stickyHeader').addClass('middleHeader');
        }
    });

    $(".testimonials-carousel").owlCarousel({
    	items : 2.99, //10 items above 1000px browser width
    	itemsDesktop : [1080,3], //5 items between 1000px and 901px
    	itemsDesktopSmall : [900,2], // betweem 900px and 601px
    	itemsTablet: [600,1], //2 items between 600 and 0
    	itemsMobile : [600,1], // itemsMobile disabled - inherit from itemsTablet option
    	navigation: true,
    	navigationText: false,
    	rewindNav: true,
    	center: true
    });
});

$('.qcSubScheduleContentTabs').tabslet();

///Mailing list subscription form

$(document).ready(function () {
    $('input[type="text"], input[type="email"]').focusin(function(){
        $(this).prev('label').addClass('label-floated');
        $(this).parent().addClass('solid-border');
    });
    $('input[type="text"], input[type="email"]').focusout(function(){
        if ($(this).val().length > 0) {
            $(this).prev('label').addClass('label-floated');
            $(this).parent().addClass('solid-border');
        } else {
            $(this).prev('label').removeClass('label-floated');
            $(this).parent().removeClass('solid-border');
        }
    });
});
