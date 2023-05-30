(function() {
  // add options / events here

   // init bootstrap native modal
   [].forEach.call(document.querySelectorAll("[data-toggle=\"modal\"]"), (element) => {
      new Modal(element);
   });

  // global modal options
  function initModal() {
    if (document.querySelector(".modal") != null) {
      const modal = document.querySelectorAll(".modal");

      [].forEach.call(modal, function(modal) {
        appendModal(modal); // resolves nested placement issues
            initFocusTrap(modal); // init focus trap
      });
    }
  }

  // append modal
  function appendModal(modal) {
    // append all modals to body
    // prevents any z-index or overflow issues from containing element
    document.body.appendChild(modal);
  }

   // set focus trap of modal
   function initFocusTrap(modal) {
      let focusableEl = modal.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), " +
         "textarea:not([disabled]), input[type=\"text\"]:not([disabled]), input[type=\"radio\"]:not([disabled]), " +
         "input[type=\"checkbox\"]:not([disabled]), select:not([disabled])");
      let firstFocusableEl = focusableEl[0];
      let lastFocusableEl = focusableEl[focusableEl.length - 1];

      let keyCodeTab = 9;

      modal.addEventListener("keydown", (e) => {
         if (e.key === "Tab" || e.keyCode === keyCodeTab) {
            if (e.shiftKey) {
               if (document.activeElement === firstFocusableEl) {
                  lastFocusableEl.focus();
                  e.preventDefault();
               }
            } else {
               if (document.activeElement === lastFocusableEl) {
                  firstFocusableEl.focus();
                  e.preventDefault();
               }
            }
         }
      });
   }

  // video modal
  function initVideoModal() {
    if (document.querySelector(".modal--video") != null) {
      const modalVideo = document.querySelectorAll(".modal--video");

      [].forEach.call(modalVideo, function(modalVideo) {
        // when modal is closed
        //console.log(modalVideo);
        modalVideo.addEventListener(
          "hide.bs.modal",
          function() {
            iframeReset(modalVideo);
          },
          false
        );
      });
    }
  }

  // animated modal
  function initAnimatedModal() {
    if (document.querySelector(".modal.animated") != null) {
      const modalAnimation = document.querySelectorAll(".modal.animated");

      [].forEach.call(modalAnimation, function(modalAnimation) {
        // modal callback
        function modalAnimationCallback() {
          self.addEventListener("animationend", transitionEnd, false);
          function transitionEnd() {
            modalAnimation.classList.remove("animate-in");
            modalAnimation.classList.remove("animate-out");
          }
        }

        // when modal is visible
        modalAnimation.addEventListener(
          "show.bs.modal",
          function() {
            modalAnimation.classList.add("animate-in");
          },
          false
        );

        // when modal is closed
        modalAnimation.addEventListener(
          "hide.bs.modal",
          function() {
            modalAnimation.classList.add("animate-out");
          },
          false
        );

        // after modal is closed
        modalAnimation.addEventListener(
          "hidden.bs.modal",
          function() {
            modalAnimationCallback();
          },
          false
        );
      });
    }
  }

  // side modal
  function initSideModal() {
    if (document.querySelector(".modal.modal--side") != null) {
      const modalSide = document.querySelectorAll(".modal.modal--side");

      [].forEach.call(modalSide, function(modalSide) {
        function modalSideCallback() {
          self.addEventListener("animationend", transitionEnd, false);
          function transitionEnd() {
            modalSide.classList.remove("animate-in");
            modalSide.classList.remove("animate-out");
          }
        }

        // when modal is visible
        modalSide.addEventListener(
          "show.bs.modal",
          function() {
            modalSide.classList.add("animate-in");
          },
          false
        );

        // when modal is closed
        modalSide.addEventListener(
          "hide.bs.modal",
          function() {
            modalSide.classList.add("animate-out");
          },
          false
        );

        // after modal is closed
        modalSide.addEventListener(
          "hidden.bs.modal",
          function() {
            modalSideCallback();
          },
          false
        );
      });
    }
  }

  // reset iframe source
  // stops iframe video from playing in the background
  function iframeReset(modalVideo) {
    if (modalVideo.querySelector("iframe")) {
      modalVideo.querySelector("iframe").setAttribute("src", modalVideo.querySelector("iframe").getAttribute("src"));
    }
  }

  // init functions & events
  // --------------------------------------------------
  initModal();
  initVideoModal();
  initAnimatedModal();
  initSideModal();
})();
