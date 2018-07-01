// Eventicka II V.1 //
// Copyright 2016, Mandar Shirke //

// --------- INIT JS ---------  //

// -- 1. NAV MENU --  //
// -- 2. COUNTDOWN TIMER --  Removed //
// -- 3. CAROUSEL --  //
// -- 4. TESTIMONIAL --  //
// -- 5. SCHEDULE TABS --  //
// -- 6. TIPSY --  //
// -- 7. MATCH HEIGHTS --  //
// -- 8. PRETTYPHOTO --  //
// -- 9. FITVIDS --  //
// -- 10. TOGGLES --  //
// -- 11. GOOGLE MAPS --  //
// -- 12. FORMS --  //

// --------------------------  //

$(document).ready(function() {

"use strict";

// --------------------  //



// --------- 1. NAV MENU ----------  //

$('#qcOpenNav').click(function() {
	$('#qcSiteNav').fadeIn();
});
$('#qcSiteNav').click(function() {
	$('#qcSiteNav').fadeOut();
});
$('#qcPriNav li').click(function() {
	$(this).find(' > ul').slideToggle();
});

/* MOBILE MENU */
$('#qcMbTrigger').text($('#qcTabNav li.active').text());
$('#qcMbTrigger').click(function() {
	$('#qcTabNav').show();
});
function mbTrigger() {
	if($('#qcMbTrigger').is(':visible')) {
		$('#qcTabNav li').click(function() {
			$('#qcTabNav').hide();
			$('#qcMbTrigger').text($(this).text());
		});
	} else {
		$('#qcTabNav').show();
		$('#qcTabNav li').click(function() {
			$('#qcTabNav').show();
		});
	}
}
mbTrigger();
$(window).resize(function() {
	mbTrigger();
});

// --------- 3. CAROUSEL ----------  //

if (jQuery.isFunction(jQuery.fn.owlCarousel)) {

// --- SPEAKERS -- //
$(".qcSpeakerList").owlCarousel({
	items : 4, //10 items above 1000px browser width
	itemsDesktop : [1080,3], //5 items between 1000px and 901px
	itemsDesktopSmall : [900,2], // betweem 900px and 601px
	itemsTablet: [600,1], //2 items between 600 and 0
	itemsMobile : [600,1], // itemsMobile disabled - inherit from itemsTablet option
	navigation: true,
	navigationText : false,
	rewindNav: false,
});

// --- SPONSORS -- //
$(".qcSponsorList").owlCarousel({
	items : 5, //10 items above 1000px browser width
	itemsDesktop : [1080,3], //5 items between 1000px and 901px
	itemsDesktopSmall : [900,4], // betweem 900px and 601px
	itemsTablet: [600,1], //2 items between 600 and 0
	itemsMobile : [600,1], // itemsMobile disabled - inherit from itemsTablet option
	navigation: true,
	navigationText : false,
	rewindNav: false,
});

}


// --------- 4. TESTIMONIAL ----------  //

$('#qcTestimonial p').html($('#qcTestimonialList li a.active').attr('data-content'));
$('#qcTestimonial cite').html('- ' + $('#qcTestimonialList li a.active').attr('data-cite'));
$('#qcTestimonialList li a').hover(function() {
	$('#qcTestimonialList li a.active').removeAttr('class');
	$(this).addClass('active');
	$('#qcTestimonial p').html($(this).attr('data-content'));
	$('#qcTestimonial cite').html('- ' + $(this).attr('data-cite'));
});
$('#qcTestimonialList li a').click(function() {
	return false;
});


// --------- 5. SCHEDULE TABS ----------  //
$('#qcScheduleContentTabs').tabslet();
$('#qcFaqContentTabs').tabslet();
$('#qcVenueContentTabs').tabslet();



// --------- 6. TIPSY ----------  //

$('.tips').tipsy({gravity: 's'});



// --------- 7. MATCH HEIGHTS ----------  //

$('.qcTicketBox > .col').matchHeight();



// --------- 8. PRETTYPHOTO ----------  //

if (jQuery.isFunction(jQuery.fn.prettyPhoto)) {
	$("a[data-rel^='prettyPhoto']").prettyPhoto({theme:'light_square'});
}



// --------- 9. FITVIDS ----------  //

$(".qcFitVids").fitVids();
$('.qcFitVids').click(function() {
	$(this).addClass('hide');
});



// --------- 10. TOGGLES ----------  //

/* SPEAKER TOGGLE */
$('.speakers .item').click(function() {
	$('.speakers .item').not(this).find('.toggled').removeClass('toggled');
	$(this).toggleClass('toggled');
	$('.speakers .item').not(this).find('.item-desc').fadeOut(200);
	$(this).find('.item-desc').slideToggle({ easing: 'easeInOutExpo' }, 600);

});

/* SCHEDULE TOGGLE */
$('.qcScheduleList .toggle, .qcFaqList .toggle').click(function() {
	$(this).toggleClass('active');
	var toggle = $(this).find('.qcTogContent');
    if (toggle.is(':visible')) {
        toggle.slideUp();
    } else {
        toggle.slideDown();
    }
});



// --------- 11. GOOGLE MAPS ----------  //

if (document.getElementById('qcContactMap')) {
	var myLatlng = new google.maps.LatLng($('#qcMapAddress').attr('data-lat'),$('#qcMapAddress').attr('data-lng'));
	var mapOptions = {
		zoom: 15,
		center: myLatlng,
		mapTypeControl: false,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById('qcContactMap'), mapOptions);
	var contentString = '<div id="content">'+
	'<div id="siteNotice">'+
	'</div>'+
	'<div id="bodyContent">'+ $('#qcMapAddress').attr('data-add') +
	'</div>'+
	'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: ''
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});

	/* RESIZE MAP ON TAB CHANGE */
	$('#qcTabNav li').click(function() {
		if($('#qcContactMap').is(':visible')) {
			google.maps.event.trigger(map, 'resize');
			map.setCenter(myLatlng);
		}
	});
}



// --------- 12. FORMS ----------  //

$('.qcForm').submit(function() {
	$(this).find('.error').remove();
	$('.inputError').removeClass('inputError');
	var hasError = false;
	$(this).find('.requiredField').each(function() {
		if($.trim($(this).val()) == '') {
			var labelText = $(this).prev( 'label').text();
			$(this).parent().append( '<span class="error">Please enter '+labelText+'</span>' );
			$(this).parent().addClass( 'inputError' );
			hasError = true;
		} else if($(this).hasClass( 'email')) {
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if(!emailReg.test($.trim($(this).val()))) {
				var labelText = $(this).prev( 'label').text();
				$(this).parent().append( '<span class="error">You have entered an invalid '+labelText+'</span>' );
				$(this).parent().addClass( 'inputError' );
				hasError = true;
			}
		} else if($(this).hasClass('checkbox')) {
			if(!$(this).is(':checked')) {
				$(this).parent().append( '<span class="error">You must agree to the Terms & Conditions</span>' );
				$(this).parent().addClass( 'inputError' );
				hasError = true;
			}
		} else if($(this).hasClass( 'captcha')) {
			if($(this).val() != 'red' && $(this).val() != 'Red') {
				$(this).parent().append( '<span class="error">You have entered wrong Captcha Value</span>' );
				$(this).parent().addClass( 'inputError' );
				hasError = true;
			}
		}
	});
	if(!hasError) {
		var formInput = $(this).serialize();
		var hideForm = $(this);
		$.post($(this).attr('action'),formInput, function(data){
			$(hideForm).slideUp( "fast", function() {
				$(this).before( '<p class="info">Thank you! Your email was successfully sent.</p>' );
			});
		});
	}
	return false;
});



// --------------------  //

});
