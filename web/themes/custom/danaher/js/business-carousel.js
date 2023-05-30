(function($) {


  // carousel
  function initCarousels() {
    $(document).ready(function() {
        console.log("in init");
        /* Slick needs no get Reinitialized on window Resize after it was destroyed */
        $(window).on('load resize orientationchange', function() {
            $('.business-carousel-wrapper').each(function(){
                var $carousel = $(this);
                // Initializes a slick carousel only on mobile screens 
                // slick on mobile
                if ($(window).width() > 1024) {
                    if (!$carousel.hasClass('slick-initialized')) {
                        $carousel.slick({
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            arrows: true,
                            infinite: false,
                            instructionsText: 'Changing this current slide of this carousel will change the current slide of the thumbnail carousel that follows.',
                            regionLabel: 'quote image carousel',
                            lazyLoad: 'onDemand',
                            centerMode: false,
                            dots: false,
                            appendArrows: $(".bcw-nav"),
                            prevArrow: $(".bcw-nav .prev"),
                            nextArrow: $(".bcw-nav .next"),
                        });
                    }
                }
                else{
                    if (!$carousel.hasClass('slick-initialized')) {
                        $carousel.slick({
                            slidesToShow: 1,
                            slidesToScroll: 1
                        });
                    }
                }
            });
        });
        

        $('.business-carousel-wrapper').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            infinite: false,
            instructionsText: 'Changing this current slide of this carousel will change the current slide of the thumbnail carousel that follows.',
            regionLabel: 'quote image carousel',
            lazyLoad: 'onDemand',
            centerMode: false,
            dots: false,
            appendArrows: $(".bcw-nav"),
            prevArrow: $(".bcw-nav .prev"),
            nextArrow: $(".bcw-nav .next"),
            responsive: [
                {
                    breakpoint: 1024,
                     settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                }
            ]
        });
        
        $('.business-carousel-wrapper').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            // console.log(currentSlide);
            if (currentSlide === undefined) {
                currentSlide = 0;
            }
            if ($(window).width() > 1024) {
                
                $('.business-carousel-wrapper+ .bcw-nav .pagination').text( Math.ceil((Math.ceil(currentSlide + 1 / 3) / Math.ceil(slick.slideCount / 3))) + " / " + Math.ceil(slick.slideCount / 3));
            } else {
                $('.business-carousel-wrapper+ .bcw-nav .pagination').text((currentSlide + 1) + " / " + slick.slideCount);
            }
        });

        $('.timeline-carousel-wrapper').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $(".timeline-nav .pagination").text(i + ' / ' + slick.slideCount);
        });

    

        $('.timeline-carousel-wrapper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrowsPlacement: 'afterSlides',
            arrows: true,
            infinite: false,
            lazyLoad: 'onDemand',
            centerMode: false,
            dots: false,
            appendArrows: $(".timeline-nav"),
            prevArrow: $(".timeline-nav .prev"),
            nextArrow: $(".timeline-nav .next"),
            variableWidth: true
        });
        
        
      });  
  }

  initCarousels();
})(jQuery);

