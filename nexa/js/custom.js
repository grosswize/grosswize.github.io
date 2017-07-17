(function( $ ) {

	var n = $('.logo-spinner .n'),
		    e = $('.logo-spinner .e'),
		    x = $('.logo-spinner .x'),
		    a = $('.logo-spinner .a'),
		    tl, text;

		tl = new TimelineMax();
		text = new TimelineMax();


	function equalHeight(element) {
		var maxHeightTabBlock = 0;
		$(element).each(function() {
			$(element).outerHeight('');
			if ($(this).outerHeight() > maxHeightTabBlock) {
				maxHeightTabBlock = $(this).outerHeight();
			}
			return maxHeightTabBlock;
		});
		$(element).outerHeight(maxHeightTabBlock);
	}


	function basicAnimate (parent, child) {
		$(parent).waypoint(function() {
			$(this).find($(child)).addClass('show-block');
		}, {offset: '95%'});
	}


	/*document ready*/
	$(document).ready(function(){

		/* ---------- custom scroll ---------- */
		
		/*$("html").niceScroll({
			cursorwidth: 0,
			scrollspeed: 500
		});*/


		/* ---------- preloader ---------- */
		
		setTimeout(function() {
			$('.spinner').css('opacity', '1');
		}, 500);


		tl.set(n, {yPercent: -200, opacity: 0});
		tl.set(e, {yPercent: -200, opacity: 0});
		tl.set(x, {yPercent: -200, opacity: 0});
		tl.set(a, {yPercent: -200, opacity: 0});
		tl.to(n, 1, {yPercent: 0, ease:Bounce.easeOut, opacity: 1}, 'split');
		tl.to(e, 1, {yPercent: 0, delay: 0.3, ease:Bounce.easeOut, opacity: 1}, 'split');
		tl.to(x, 1, {yPercent: 0, delay: 0.6, ease:Bounce.easeOut, opacity: 1}, 'split');
		tl.to(a, 1, {yPercent: 0, delay: 0.9, ease:Bounce.easeOut, opacity: 1}, 'split');
		tl.to($('.spinner'), 1, {opacity: 0}).to($('.page-loader-wrap'), 0.1, {yPercent: -200, delay: 0.8});

		$(window).load(function() {
			$('.page-loader-wrap').addClass('loaded');
		});

		/* ---------- for IE ---------- */
		if(Function('/*@cc_on return document.documentMode===10@*/')()){ $("body").addClass("ie10"); }


		/* ---------- first load page ---------- */

		/*setTimeout(function() {
			$('.main-logo-wrap').addClass('animated-hero-button');
			$(".border-animate path").css('opacity', '1');
			tl.from(".border-animate path", 0.5, {drawSVG:"0%"});
			tl.to(".border-animate path", 0.5, {drawSVG:"100% 100%"});
		}, 3000);*/



		/* ---------- hero slider ---------- */

		//initialize

		$('.hero-slider').slick(
		{
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			autoplay: true,
			autoplaySpeed: 6000,
			arrows: false,
			infinite: true,
			prevArrow: '<button class="slide-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
			nextArrow: '<button class="slide-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>'
		});

		// set height for slider

		$('.hero, .hero-slide').css('height', $(window).height());


		// animate content in slides

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function() {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function() {
					$this.removeClass($animationType);
				});
			});
		}


		$('.hero-slider').on('init', function(e, slick) {
			var $firstAnimatingElements = $('div.hero-slide:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);    
		});
		$('.hero-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('div.hero-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);    
		});

		$('.hero-slider').on('afterChange', function(e, slick, currentSlide, nextSlide) {
			$('.slick-slide .main-logo-wrap').removeClass('animated-hero-button');
			$('.slick-current .main-logo-wrap').addClass('animated-hero-button');
		});

		/* ----------------------------------------------------------------- */


	



		/* ---------- scrollSpy ---------- */

		$('body').scrollspy({
		 target: '#dots-nav',
		 offset: 100 
		});

		$('#myScrollspy').addClass('light-color');

		$(window).on('scroll', function() {

			if($('#myScrollspy li').hasClass('active')) {
				$('#myScrollspy').removeClass('light-color');
			}
			else {
				$('#myScrollspy').addClass('light-color');
			}

		});

		/* ----------------------------------------------------------------- */





		var sectionOffset = $('.welcome').offset().top;
		var customEase = $.bez([0.8,0,0.21,1]);




		/* ---------- sticky header ---------- */

		var headerHeight = $('.main-header').outerHeight() + 10;
		$('.main-header').css('top', -headerHeight);
		$('.welcome').css('padding-top', headerHeight + 100);

		$(window).scroll(function() {
			var windowScroll = $(this).scrollTop();
			if(windowScroll >= sectionOffset) {
				$('.main-header').css('top', '0');
			}
			else {
				$('.main-header').css('top', -headerHeight);
			}

			if(windowScroll >= sectionOffset + 200) {
				$('.main-header').addClass('sticky');
			}
			else {
				$('.main-header').removeClass('sticky');
			}
		});

		//glitch
		$('a.glitch').each(function(i){ 
			var spanCont = $(this).html();
			$(this).prepend('<span>'+spanCont+'</span>')
			.append('<span>'+spanCont+'</span>');
		});

		/* ----------------------------------------------------------------- */





		var run = true;

		$('#main-nav li a').on('click', function(element) { 
			element.preventDefault();
			run = false;
			var el = $( element.target.getAttribute('href') );
			var elOffset = el.offset().top;
			$('html, body').stop().animate(
				{ scrollTop:elOffset},
				{duration: 1500,
					easing: customEase,	
					complete: function() {
						run = true;
					}
				});
			return false;
		});

		/* ---------- sections navigation bullets ---------- */

		$('#dots-nav li a').on('click', function(e) {
			e.preventDefault();
			run = false;
			var el = $( e.target.getAttribute('href') );
			var elOffset = el.offset().top;
			$('html, body').stop().animate(
				{ scrollTop:elOffset},
				  {duration: 1500,
				  easing: customEase,	
				  complete: function() {
				  	run = true;
				  }
				});
			return false;
		});


		/* ---------- run button ---------- */

		$('.scroll-down').on('click', function(e) {
			e.preventDefault();
			run = false;
			$('html, body').stop().animate(
				{ scrollTop:sectionOffset},
				{duration: 1500,
					easing: customEase,	
					complete: function() {
						run = true;
					}
				});
			return false;
		});


		/* ---------- go to top ---------- */

		$('.go-top').on('click', function(e) {
			e.preventDefault();
			run = false;
			$('html, body').stop().animate(
				{ scrollTop: 0},
				{duration: 2000,
					easing: customEase,	
					complete: function() {
						run = true;
					}
				});
		});

		$(window).scroll(function() {
			if($(this).scrollTop() > $('.welcome').offset().top) {
				$('.go-top').addClass('show');
			}
			else {
				$('.go-top').removeClass('show');
			}
		});
		


		/* ---------- scroll sections ---------- */

		function animateSection (current, prev) {

			$(current).waypoint(function(direction) {
				if(direction === "down" && run === true) {
					$('html, body').stop(false, true).animate({
						scrollTop: $(current).offset().top
					}, 1500);
				}
			}, {
				offset: "95%"
			}).waypoint(function(direction) {
				if(direction === "up" && run === true) {
					$('html, body').stop(false, true).animate({
						scrollTop: $(prev).offset().top
					}, 1500);
				}
			}, {
				offset: "0"
			});

		}

		setTimeout(function() {
			animateSection('.welcome', '.hero');
			animateSection('.services', '.welcome');
			animateSection('.about', '.services');
			animateSection('.work', '.about');
			animateSection('.blog', '.work');
			animateSection('.contact', '.blog');
		}, 2000);



		/* ---------- WELCOME section ---------- */

		basicAnimate('.welcome', '.welcome-slider');



		/* ---------- welcome slider ---------- */
			
		$('.welcome-slider').slick(
		{
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			autoplay: true,
			autoplaySpeed: 6000,
			dots: true,
			arrows: false,
			infinite: true
		});

		$('.welcome-slider .slick-dots li button').text('');
	

		$(window).on('scroll', function() {
			if($(this).scrollTop() + $(this).height() > $('.achievements').offset().top + $('.achievements').height()) {
				$('.achievements-content-wrap').addClass('wrap-animated');
			}
		});


		/* ---------- counters ---------- */
		setTimeout(function() {
			$('.achievement .quantity').counterUp({
				time: 500
			});
		},1);


		/* ---------- greeting block of each section ---------- */

		equalHeight('.greeting-block .img-block, .greeting-block .slogan-block');




		/* ---------- services section ---------- */

		if($(window).width() > 767) {
			equalHeight('.services .tab-list, .services .tab-content');
		}
		
		$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
			setTimeout(function() {
				$('.tab-img-wrapper').animated('show-block');
			}, 10);
			$('.tab-text-block').animated('show-block');
		});

		$('a[data-toggle="tab"]').on('hide.bs.tab', function () {
				$('.tab-img-wrapper').removeClass('show-block');
				$('.tab-text-block').removeClass('show-block');
		});

		basicAnimate('.services-block', '.tab-list');
		basicAnimate('.services-block', '.tab-img-wrapper');
		basicAnimate('.services-block', '.tab-text-block');



		/* ---------- packages block ---------- */

		basicAnimate('.packages-block', '.current-section-name');

		$('.packages-block').waypoint(function() {
			tl.staggerTo($('.package'), 1, {
				left: "0",
				opacity: "1"
			}, 0.3);
		}, {offset: '90%'});


		basicAnimate('.clients-block', '.logo-slider');

		$('.logo-slider').slick(
		{
			slidesToShow: 4,
  		slidesToScroll: 4,
  		autoplay: true,
  		autoplaySpeed: 6000,
  		infinite: true,
  		arrows: true,
  		prevArrow: '<button class="slide-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
  		nextArrow: '<button class="slide-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>'
		});


		basicAnimate('.clients-block', '.current-section-name');



		/* ---------- basic styles for section sliders ---------- */

		/*$('.basic-slider').waypoint(function() {
			tl.to($(this), 1, {
				top: "0",
				opacity: "1"
			});
		}, {offset: '90%'});*/



		/* ---------- about ---------- */

		basicAnimate('.team-block', '.current-section-name');

		$('.team-slider').slick(
		{
			slidesToShow: 3,
  		slidesToScroll: 1,
  		autoplay: true,
  		autoplaySpeed: 6000,
  		infinite: true,
  		arrows: true,
  		prevArrow: '<button class="slide-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
  		nextArrow: '<button class="slide-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>'
		});

		basicAnimate('.team-block', '.team-slider');



		/* ---------- skills ---------- */

		basicAnimate('.skills-block', '.current-section-name');

		var bodyBg = $('body').css('background-color');

		$('.skills-wrapper').waypoint(function() {
			$(this).addClass('show-skills');

			$('.skill-chart').roundSlider({
				radius: 91,
				editableTooltip: false,
				readOnly: true,
				mouseScrollAction: true,
				keyboardAction: false,
				circleShape: "half-top",
				sliderType: "min-range",
				showTooltip: true,
				width: 10,
				step: 0.2,
				tooltipFormat: tooltipVal
			});

			setTimeout(function() {
				$('.skill-photoshop').roundSlider({
					value: 80
				});

				$('.skill-illustrator').roundSlider({
					value: 60
				});

				$('.skill-flash').roundSlider({
					value: 40
				});

				$('.skill-in-design').roundSlider({
					value: 99
				});
			}, 500);
			
		}, {offset: '95%'});


		function tooltipVal(args) {
			return args.value + "%";
		}


    $('.rs-bg-color').css('background-color', bodyBg);
    $('.rs-handle').css('border-color', bodyBg);


		/* ---------- testimonials ---------- */

		basicAnimate('.testimonials-block', '.current-section-name');

		$('.testimonials-slider').slick(
		{
			slidesToShow: 1,
  		slidesToScroll: 1,
  		autoplay: true,
  		autoplaySpeed: 6000,
  		infinite: true,
  		arrows: true,
  		fade: true,
  		prevArrow: '<button class="slide-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
  		nextArrow: '<button class="slide-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>'
		});

		basicAnimate('.testimonials-block', '.testimonials-slider');



		/* ---------- plan block ---------- */
		var iconScale = $('.plan-part');
		$('.plan-block').waypoint(function() {
			tl.staggerTo(iconScale, 1, {
				scale: 1
			}, 0.3);
		}, {offset: '80%'});

		$('.plan-part').each(function() {
			$(this).css('top', -1*($(this).height()/2));
			$(this).find('.plan-part-content').css('bottom', -1*($(this).find('.plan-part-content').height()));
		});

		$('.plan-part').hover(function() {
			$(this).addClass('show-part-content');
			$(this).css('top', -1*($(this).height()/2 + $(this).find('.plan-part-content').height()/2));
			$(this).css('padding-bottom', $(this).find('.plan-part-content').height());
		}, function() {
			$(this).removeClass('show-part-content');
			$(this).css('top', -1*($(this).height()/2));
			$(this).css('padding-bottom', '0');
		});



		/* ---------- work section ---------- */

		$('.projects-gallery .description').hover(function() {
			$(this).addClass('show-content');
		}, function() {
			$(this).removeClass('show-content');
		});


		/* ---------- isotope filter ---------- */

		var $grid = $('.grid').isotope({
			itemSelector: '.grid__item',
			layoutMode: 'fitRows'
		});


		$('.filters-button-group').on( 'click', 'button', function() {
			var filterValue = $( this ).attr('data-filter');
		  $grid.isotope({ filter: filterValue });
		});

		$('.button-group').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'button', function() {
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				$( this ).addClass('is-checked');
			});
		});

		/* ------------------------------------------------------------ */





		/* ---------- blog section ---------- */

		// var postContentWidth = $('.post-content').width();
		if($(window).width() > 1170) {
			equalHeight('.services .tab-list, .services .tab-content');
			$('.blog-posts .post-content').height($('.post-content').width() - 32);
			$('.featured-blog-post .post-content').height($('.post-content').width() - 32);
		}

		$('.modal-slider').slick(
		{
			slidesToShow: 1,
  		slidesToScroll: 1,
  		autoplay: true,
  		autoplaySpeed: 6000,
  		infinite: true,
  		arrows: true,
  		fade: true,
  		prevArrow: '<button class="slide-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
  		nextArrow: '<button class="slide-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>'
		});

		$('.modal').on('shown.bs.modal', function (e) {
			$('.modal-slider').resize();
		});



		$('.cta-slider').slick(
		{
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
  		autoplaySpeed: 6000,
			infinite: true,
			arrows: false,
			dots: true,
			vertical: true,
			autoHeight: true
		});

		$('.cta-slider .slick-dots li button').text('');




		/* ---------- contact ---------- */

		if($(window).width() > 767) {
			equalHeight('.info-wrapper-left-side, .info-wrapper-right-side');
		}
		
		/* ---------- run scrollr ---------- */

		setTimeout(function () {
			var parallaxScroll = skrollr.init();
			skrollr.get().refresh();
		}, 1000);



		/* ---------- run animation main content ---------- */
		$('.greeting-block, .greeting-block .img-container').animated('show-block');
		$('.description-block .description-block-img, .description-block .description-block-content').animated('show-block');
		$('.team-slider .team-slide-img-wrapper, .team-slider .team-slide-person, .team-slider .side-socials-wrapper').animated('show-block');
		$('.testimonials-slider .slide-image, .testimonials-slider .slide-content-wrap').animated('show-block');
		$('.projects-gallery').animated('show-block');
		$('.blog-posts').animated('show-block');
		$('.contact-content').animated('show-block');
		$('.contact-content .img-container, .contact-content .info-wrapper-left-side').animated('show-block');
		$('.main-footer').animated('show-block');
		
		
		/* ---------- animate slides ---------- */

		$('.effect-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.effect-slider .slick-slide').addClass('animate-slide-before');
			$('.effect-slider .slick-current').removeClass('animate-slide-before');
		});

		$('.effect-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
			$('.effect-slider .slick-slide').removeClass('animate-slide-after');
			$('.effect-slider .slick-current').addClass('animate-slide-after');
			setTimeout(function() {
				$('.effect-slider .slick-slide').removeClass('animate-slide-before');
			}, 1000);
		});

	});











	/*window load*/
	$(window).load(function() {

	});




	






	/*window resize*/
	$(window).resize(function() {

		$('.hero, .hero-slide').css('height', $(window).height());

		var headerHeight = $('.main-header').outerHeight() + 10;
		$('.main-header').css('top', -headerHeight);
		$('.welcome').css('padding-top', headerHeight + 100);


		if($(window).width() > 1170) {
			equalHeight('.services .tab-list, .services .tab-content');
			$('.blog-posts .post-content').height($('.post-content').width() - 32);
			$('.featured-blog-post .post-content').height($('.post-content').width() - 32);
		}

		if($(window).width() > 767) {
			equalHeight('.info-wrapper-left-side, .info-wrapper-right-side');
		}

	});




})(jQuery);	


	