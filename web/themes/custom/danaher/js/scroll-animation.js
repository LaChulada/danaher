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

      var hero = document.querySelectorAll(".hero--subcategory-hero");
      for (var i = 0; i < hero.length; i++) {                
          var windowHeight = window.innerHeight;
          var elementTop = hero[i].getBoundingClientRect().top;
          var elementVisible = 350;
          if (elementTop < windowHeight - elementVisible) {            
            addClass(hero[i], 'active',i);
          }                  
      }

      var hero = document.querySelectorAll(".hero--category_hub_page_hero .text-content");      
      if(hero.length > 0){
        var windowHeight = window.innerHeight;      
        var elementTop = hero[0].getBoundingClientRect().top;
        var elementVisible = 350;
        if (elementTop < windowHeight - elementVisible) {            
          addClass(hero[0], 'active',i);
        } 
      }
      
      var hero = document.querySelectorAll(".hero--person");      
      if(hero.length > 0){
        var windowHeight = window.innerHeight;      
        var elementTop = hero[0].getBoundingClientRect().top;
        var elementVisible = 350;
        if (elementTop < windowHeight - elementVisible) {            
          addClass(hero[0], 'active',i);
        } 
      }

    }

    $(document).ready(function() {        
      window.addEventListener("scroll", reveal);
      setTimeout(function() {
        //$(".option").on("click",function(){console.log('cambia')});
        $("[data-drupal-selector='edit-choice']").on("change",function(e){          
          e.preventDefault();
          $(this).closest("form").trigger("submit");
          /*var l = $(this).closest('.vote-form').find("#edit-vote").get(0);
          console.log(l);
          $(l).trigger("change").trigger('autocompleteclose');
          console.log("nada");*/
        })
      }, 2000);
    });

    function addClass(elem, cls, times){
      setTimeout(function() {
        elem.classList.add(cls);  
      }, times * 200);
      
    }

 })(jQuery);
 