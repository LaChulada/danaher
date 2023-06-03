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

      var stats = document.querySelectorAll(".stats--item");

      for (var i = 0; i < stats.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = stats[i].getBoundingClientRect().top;
        var elementVisible = 350;

        if (elementTop < windowHeight - elementVisible) {
          stats[i].classList.add("active");
        } else {
          stats[i].classList.remove("active");
        }
      }


    }

    $(document).ready(function() {        
        window.addEventListener("scroll", reveal);
     });

 })(jQuery);
 