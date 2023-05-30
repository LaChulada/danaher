'use strict';

(function ($) {
   // add options / events here
   // init bootstrap native collapse
   [].forEach.call(document.querySelectorAll("[data-toggle=\"collapse\"]"), (element) => {
      new Collapse(element);
   });

   // .collapse-content.collapse.show -> remove show, set aria-expanded="true" --> false


   //specify the not in the selector so that we don't trigger things twice. This also means that it'll also work on mobile
   $('.accordion .collapse-trigger.collapsed:not(.image-trigger)').on("click", function(event) {
      // var childrenOfThis = $(this).siblings(".collapse-content.collapse.show");
      // debugger;

      var associatedID = ".image-trigger.image-" + $(this).attr("aria-controls");

      $(associatedID).trigger("click");
      
      var closeThese = $(this).parents(".accordion").find(".collapse-content.collapse.show");
      $(closeThese).attr("aria-expanded", "false").removeClass("show");
      $(closeThese).siblings(".collapse-trigger").attr("aria-expanded", "false").addClass("collapsed");
   });


   

})(jQuery);
