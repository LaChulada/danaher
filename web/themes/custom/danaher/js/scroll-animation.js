'use strict';

(function($) {

    function reveal() {
      
      //Animation1 List
      var animation1 = [".blog-hero-right-side figure",".media--image",".text-and-image",".paragraph--type--flexible-framer-image-item",".stats--item",".hero--subcategory-hero", ".paragraph--type--linked-logo", ".hero--category_hub_page_hero figure"]

      animation1.forEach(function(v){
        var elems = document.querySelectorAll(v);
        for (var i = 0; i < elems.length; i++) {
          var windowHeight = window.innerHeight;
          var elementTop = elems[i].getBoundingClientRect().top;
          var elementVisible = 350;

          if (elementTop < windowHeight - elementVisible) {
            addClass(elems[i], 'active',i);          
          }
        }     
      })

      //Animaton2 List
      var animation2 = [".hero--category_hub_page_hero .text-content",".hero--person"];

      animation2.forEach(function(v,i){
        var elems = document.querySelectorAll(v);      
        if(elems.length > 0){
          var windowHeight = window.innerHeight;      
          var elementTop = elems[0].getBoundingClientRect().top;
          var elementVisible = 350;
          if (elementTop < windowHeight - elementVisible) {            
            addClass(elems[0], 'active',i);
          } 
        }
      })
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
 