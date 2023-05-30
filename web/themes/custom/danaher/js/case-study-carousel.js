(function($) {

  function resetLabels() {
    $('.case-studies .form-item .description').each(function () {  // description is the help text
      var desc = $(this);
      var label = desc.siblings('label:first');
       if (label.length) {
         desc.insertAfter(label);
       }
       jQuery('.case-studies .form-item label').addClass("sr-only");
    })
    // the help text is tangled up in the text format stuff on a filtered text field
    $('.case-studies .text-format-wrapper .description').each(function () {
      var desc = $(this);
      var label = desc.siblings('.form-item').find('label:first');
       if (label.length) {
          desc.insertAfter(label);
       }
    })
  }

  // carousel
  function initCarousel() {
    $(document).ready(function() {
      resetLabels();
  
        // $('.case-studies-carousel-wrapper').slick({
        //     slidesToShow: 3,
        //     slidesToScroll: 1,
        //     arrowsPlacement: 'afterSlides',
        //     arrows: true,
        //     instructionsText: 'Changing this current slide of this carousel will change the current slide of the thumbnail carousel that follows.',
        //     regionLabel: 'main image carousel'
        // });
      });

      $(".case-studies-carousel-form input[type='submit']").on("click", function() {
        resetLabels();
      });    
  }

  // initCarousel();
})(jQuery);