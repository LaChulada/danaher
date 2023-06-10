'use strict';

(function($) {

    var polls_animates = [];

    function reveal() {
      
      //Animation1 List
      var animation1 = [".blog-hero-right-side figure",".media--image",".text-and-image",".paragraph--type--flexible-framer-image-item",".stats--item",".hero--subcategory-hero", ".paragraph--type--linked-logo", ".hero--category_hub_page_hero figure", ".paragraph--type--flexible-framer-icon-item"]

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

      var polls = document.querySelectorAll(".poll .choice-result");  
      for (var i = 0; i < polls.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = polls[i].getBoundingClientRect().top;
        var elementVisible = 350;

        if (polls_animates.indexOf(i) === -1 && elementTop < windowHeight - elementVisible) {
          animatePoll(polls[i], i);
        }
      }  




    }

    $(document).ready(function() {        
      window.addEventListener("scroll", reveal);
      setTimeout(function() {                                
        $("[data-drupal-selector='edit-choice']").on("change",function(e){          
          $(this).closest("form").trigger("submit");          
        })
      }, 2000);
    });

    function addClass(elem, cls, times){
      setTimeout(function() {
        elem.classList.add(cls);  
      }, times * 200);
      
    }

    function animatePoll(poll, index){
      polls_animates.push(index);      
      var percent = $(poll).find(".percent");
      var bar = $(poll).find(".foreground");
      var percent_value = parseInt($(percent).html());          
      percent.html('0%');
      bar.css('width','0%');
      let cantidad=0
      let tiempo=setInterval(() => {        
        //color.style.height=`${cantidad}%`
        percent.html(cantidad+'%');
        bar.css('width',cantidad+'%');
        if(cantidad===percent_value){
          clearInterval(tiempo);
        }
        cantidad+=1
      }, 20);
    }

 })(jQuery);
 