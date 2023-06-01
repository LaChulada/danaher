'use strict';

(function($) {

    function reveal() {
      var reveals = document.querySelectorAll("figure");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 350;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("reveal-active");
        } else {
          reveals[i].classList.remove("reveal-active");
        }
      }
    }

    $(document).ready(function() {
        console.log("Custom ok test");
        window.addEventListener("scroll", reveal);
     });

 })(jQuery);
 