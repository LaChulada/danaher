'use strict';

(function($) {
    function initAlert() {
       const alert = document.querySelectorAll(".alert");

 
       if (alert != null) {

          [].forEach.call(alert, (self) => {
             let alertCloseBtn = self.querySelector(".alert-close");
             var isAlertClosed = getCookie('alertclosed');

             if (isAlertClosed !== 'true') {
               jQuery(alert).fadeIn();
             }

             // hide alert
             function hideAlert() {
                self.classList.add("animate-out");
                alertAnimationCallback();
                $(".hero--immersive-wrapper-first-pane").removeClass("has-alert");
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
                   setCookie("alertclosed", "true", 0);
                });
 
                // Hide Alert on keyboard Esc when in focus
                self.addEventListener("focusin", () => {
                   self.addEventListener("keyup", (e) => {
                      if (e.key === "Escape") {
                         hideAlert();
                         setCookie("alertclosed", "true", 0);
                      }
                   });
                });
             }
          });
       }
    }
 
    // init functions & events
    // --------------------------------------------------
    initAlert();
 })(jQuery);
 