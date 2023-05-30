(function($) {


  // carousel
  function initCarousel() {
    $(document).ready(function() {


        /* Slick needs no get Reinitialized on window Resize after it was destroyed */
        
        $(window).on('load resize orientationchange', function() {
            $('.steps-carousel-wrapper').each(function(){
                var $carousel = $(this);
                // Initializes a slick carousel only on mobile screens 
                // slick on mobile
                if ($(window).width() > 1024) {
                    if ($carousel.hasClass('slick-initialized')) {
                        $carousel.slick('unslick');
                        //console.log("skunk");
                    }
                }
                else{
                    if (!$carousel.hasClass('slick-initialized')) {
                        $carousel.slick({
                            arrowsPlacement: 'afterSlides',
                            arrows: true,
                            infinite: false,
                            instructionsText: 'Changing this current slide of this carousel will change the current slide of the thumbnail carousel that follows.',
                            regionLabel: 'quote image carousel',
                            lazyLoad: 'onDemand',
                            centerMode: false,
                            infinite: true,
                            dots: false,
                            appendArrows: $(".steps-nav"),
                            prevArrow: $(".steps-nav .prev"),
                            nextArrow: $(".steps-nav .next"),
                            mobileFirst: true,
                            responsive: [
                                {
                                    breakpoint: 1025,
                                    settings: "unslick"
                                },
                                {
                                    breakpoint: 1024,
                                     settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                        }
                                }
                            ]
                        });
                    }
                }
            });
        });
        

        $('.steps-carousel-wrapper').slick({
            // instructionsText: 'Changing this current slide of this carousel will change the current slide of the thumbnail carousel that follows.',
            // regionLabel: 'quote image carousel',
            // lazyLoad: 'onDemand',
            arrowsPlacement: 'afterSlides',
            arrows: true,
            infinite: false,
            instructionsText: 'Changing this current slide of this carousel will change the current slide of the thumbnail carousel that follows.',
            regionLabel: 'quote image carousel',
            lazyLoad: 'onDemand',
            centerMode: false,
            infinite: true,
            dots: false,
            appendArrows: $(".steps-nav"),
            prevArrow: $(".steps-nav .prev"),
            nextArrow: $(".steps-nav .next"),
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: "unslick"
                },
                {
                    breakpoint: 1024,
                     settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                }
            ]
        });
        
      });  
  }

  initCarousel();
})(jQuery);

