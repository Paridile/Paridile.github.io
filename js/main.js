

$(function() {

  var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky(); 

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed contacto">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });
		$this.find('.contacto').attr({
			'data-toggle' : 'collapse',
			'data-target' : '#collapseItem' + counter,
		  });
  

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        }); 

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();        
    });

	$('body').on('click', '.contacto', function(e) {
		var $this = $(this);
		if ( $this.closest('li').find('.collapse').hasClass('show') ) {
		  $this.removeClass('active');
		} else {
		  $this.addClass('active');
		}
		e.preventDefault();        
	  });


		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});


	}; 

	$('.cursor').text(function() {
		setInterval(() => this.hidden = !this.hidden, 1000);	
	}
	)
	siteMenuClone();

});

$('#carouselExample').on('slide.bs.carousel', function (e) {

  
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});

  $(document).ready(function() {
/* show lightbox when clicking a thumbnail */
    $('a.thumb').click(function(event){
      event.preventDefault();
      var content = $('.modal-body');
      content.empty();
        var title = $(this).attr("title");
        $('.modal-title').html(title);        
        content.html($(this).html());
        $(".modal-profile").modal({show:true});
    });
	
  });

  $(document).ready(function(){
  
	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:5
			}
		}
	})
	});


	$(document).ready(function() {
		$("#formulario").validate({
			submitHandler: function(form, event) {
				event.preventDefault();
				var $form = $(form);
				var $button = $form.find('button[type="submit"]');
				var originalText = $button.text();
				
				var currentLang = localStorage.getItem('portfolio-lang') || 'en';
				var sendingText = (translations[currentLang] && translations[currentLang]["contact-btn-sending"]) || "Sending...";
				var sentText = (translations[currentLang] && translations[currentLang]["contact-btn-sent"]) || "Message Sent!";
				var errorText = (translations[currentLang] && translations[currentLang]["contact-btn-error"]) || "Error. Please try again.";

				$button.prop('disabled', true).text(sendingText);

				$.ajax({
					url: $form.attr('action'),
					method: 'POST',
					data: $form.serialize(),
					dataType: 'json',
					success: function() {
						$button.text(sentText);
						$form.trigger('reset');
						setTimeout(function() {
							$button.prop('disabled', false).text(originalText);
						}, 4000);
					},
					error: function() {
						$button.text(errorText);
						setTimeout(function() {
							$button.prop('disabled', false).text(originalText);
						}, 4000);
					}
				});
			}
		});
	});

	window.changeLanguage = function(lang) {
		if (typeof translations === 'undefined' || !translations[lang]) return;
		
		localStorage.setItem('portfolio-lang', lang);
		
		// Translate text content
		$('[data-translate]').each(function() {
			var key = $(this).data('translate');
			if (translations[lang][key]) {
				$(this).html(translations[lang][key]);
			}
		});

		// Translate placeholders
		$('[data-translate-placeholder]').each(function() {
			var key = $(this).data('translate-placeholder');
			if (translations[lang][key]) {
				$(this).attr('placeholder', translations[lang][key]);
			}
		});

		// Highlight active language selection in both cloned nav and primary nav
		$('.language-selector-item').removeClass('active');
		$('.language-selector-item-' + lang).addClass('active');
	};

	$(document).ready(function() {
		var savedLang = localStorage.getItem('portfolio-lang') || 'en';
		window.changeLanguage(savedLang);
	});