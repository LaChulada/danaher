(function($) {


  // carousel
  function initQuoteCarousel() {
    $(document).ready(function() {

        /* Slick needs no get Reinitialized on window Resize after it was destroyed */
        $(window).on('load resize orientationchange', function() {
            $('.dynamic-quote-wrapper').each(function(){
                var $carousel = $(this);
                /* Initializes a slick carousel only on mobile screens */
                // slick on mobile
                if ($(window).width() > 1024) {
                    if ($carousel.hasClass('slick-initialized')) {
                        $carousel.slick('unslick');
                    }
                }
                else{
                    if (!$carousel.hasClass('slick-initialized')) {
                        $carousel.slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            arrows: true,
                            centerMode: false,
                            dots: true,
                            appendArrows: $(".dqc-nav"),
                            prevArrow: $(".dqc-nav .prev"),
                            nextArrow: $(".dqc-nav .next")
                        });
                    }
                }
            });
        });

        $('.dynamic-quote-wrapper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrowsPlacement: 'afterSlides',
            arrows: true,
            infinite: true,
            instructionsText: 'Changing this current slide of this carousel will change the current slide of the thumbnail carousel that follows.',
            regionLabel: 'quote image carousel',
            lazyLoad: 'onDemand',
            centerMode: false,
            infinite: true,
            dots: false,
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
                            infinite: true,
                            arrows: true,
                            centerMode: false,
                            dots: false,
                            appendArrows: $(".dqc-nav"),
                            prevArrow: $(".dqc-nav .prev"),
                            nextArrow: $(".dqc-nav .next")
                        }
                }
            ]
        });

        $('.dynamic-quote-wrapper').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            // console.log(currentSlide);
            if (currentSlide === undefined) {
                currentSlide = 0;
            }
            $('.dynamic-quote-wrapper + .dqc-nav .pagination').text((currentSlide + 1) + " / " + slick.slideCount);
        });
      });  
  }

  initQuoteCarousel();
})(jQuery);

