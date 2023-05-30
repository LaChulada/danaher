'use strict';

(function($) {

   let promobanner = document.querySelectorAll(".promotional-banner")

   let lastKnownScrollPosition = 0;
   let ticking = false;
   var isPromoBannerClosed = getCookie('promobannerclosed');

   if (isPromoBannerClosed !== 'true') {
     jQuery(promobanner).fadeIn();
   }


   function moveTopPosition() {
       if ($("header").hasClass("stuck")) {               
           if ($(window).width() > 1200) {
               $(".promotional-banner").addClass("scrolled");
               $(".promotional-banner").css("top", $("header").innerHeight() + "px");
           } else {
               $(".promotional-banner").removeClass("scrolled");
               $(".promotional-banner").css("top", "");
           }
        } else {
            $(".promotional-banner").removeClass("scrolled");
            $(".promotional-banner").css("top", "");
        }
   }

   function checkTopPosition(scrollPos) {
       // console.log(scrollPos);
       moveTopPosition();
   }

   addEventListener("resize", (event) => { moveTopPosition() });


   document.addEventListener("scroll", (event) => {
       lastKnownScrollPosition = window.scrollY;
     
       if (!ticking) {
         window.requestAnimationFrame(() => {
           checkTopPosition(lastKnownScrollPosition);
           ticking = false;
         });
     
         ticking = true;
       }
   });

    function initPromoBanner() {
        const alert = document.querySelectorAll(".promotional-banner");
 
        if (alert != null) {
           [].forEach.call(alert, (self) => {
              let alertCloseBtn = self.querySelector(".alert-close");
  
              // hide alert
              function hideAlert() {
                 self.classList.add("animate-out");
                 alertAnimationCallback();
              }
  
              function alertAnimationCallback() {
                 self.addEventListener("animationend", transitionEnd, false);
                 function transitionEnd() {
                    self.remove(); // remove alert from DOM
                 }
              }
  
              if (self.querySelector(".alert-close")) {
                 // Hide Alert on alertCloseBtn trigger
                 alertCloseBtn.addEventListener("click", () => {
                    hideAlert();
                    setCookie("promobannerclosed", "true", 0);
                 });
  
                 // Hide Alert on keyboard Esc when in focus
                 self.addEventListener("focusin", () => {
                    self.addEventListener("keyup", (e) => {
                       if (e.key === "Escape") {
                          hideAlert();
                          setCookie("promobannerclosed", "true", 0);
                       }
                    });
                 });
              }
           });
        }
    }
  
    initPromoBanner();
  })(jQuery);