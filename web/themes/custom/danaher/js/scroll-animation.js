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
        }
      }

      var stats = document.querySelectorAll(".stats--item");

      for (var i = 0; i < stats.length; i++) {                
          var windowHeight = window.innerHeight;
          var elementTop = stats[i].getBoundingClientRect().top;
          var elementVisible = 350;
          if (elementTop < windowHeight - elementVisible) {            
            addClass(stats[i], 'active',i);
          }                  
      }
    }

    $(document).ready(function() {        
      window.addEventListener("scroll", reveal);
    });

    function addClass(elem, cls, times){
      setTimeout(function() {
        elem.classList.add(cls);  
      }, times * 200);
      
    }

 })(jQuery);
 