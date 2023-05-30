'use strict';

(function (hoverintent, options, show, hide, $) {
   // init navigation
   function initNavigation() {
      const navItems = document.querySelectorAll(".navigation-item");


      
      if (options === undefined) {
         options = window.options;
      }

      // show menu
      function showMenu(targetNavItem, targetNavMenu, navMenus) {
         window.show(targetNavMenu, options);

         // if target menu has close button
         if (targetNavMenu.querySelector("button[data-close-menu]") != null) {
            let btnCloseMenu = targetNavMenu.querySelector("button[data-close-menu]");

            // hide menu on button keypress
            btnCloseMenu.addEventListener("click", function() {
               // forEach menu
               navMenus.forEach(function(navMenus){
                  // if menu state is opened
                  if(navMenus.classList.contains(options.stateOpened)){
                     inactiveNavItem(targetNavItem);
                     window.hide(navMenus, options);

                     // set focus back on original navItem
                     targetNavItem.focus();

                     // if targetNavMenu is navigation overlay
                     if (targetNavMenu.classList.contains("navigation-overlay")) {
                        document.body.classList.remove("overflow-hidden");
                     }
                  }
               });
            });
         }

         if (document.getElementById("navigation-input-search") !== null) {
            document.getElementById("navigation-input-search").addEventListener("keydown", (event) => {
               if (event.key === "Enter") {
               var input_val = document.getElementById("navigation-input-search").value;
               if (input_val.length) {
                  location.href = "/search?keys=" + escape(input_val);
               }
               event.preventDefault();
            }
         });
         }


         //document.getElementById("edit-submit-searc9h").addEventListener("click", (event) => {
         /*
         document.querySelector(".search-wrapper .btn").addEventListener("click", (event) => {
            //debugger;
            var input_val = document.getElementById("navigation-input-search").value;
         if (input_val.length) {
            location.href = "/search?keys=" + escape(input_val);
         }
         
         event.preventDefault();
      });
      */

         // hide menu on (esc) keypress
         document.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
               targetNavItem = document.querySelector(".navigation-item .menu-open");

               // forEach menu
               navMenus.forEach(function(navMenus){
                  // if menu state is opened
                  if(navMenus.classList.contains(options.stateOpened)){

                     // set focus back on original navItem
                     targetNavItem.focus();

                     inactiveNavItem(targetNavItem);
                     window.hide(navMenus, options);

                     // if targetNavMenu is navigation overlay
                     if (targetNavMenu.classList.contains("navigation-overlay")) {
                        document.body.classList.remove("overflow-hidden");
                     }
                  }
               });
            }
         });

         // if targetNavMenu is navigation menu
         if (targetNavMenu.classList.contains("navigation-menu")) {
            focusTrap(targetNavMenu);
         }

         // if targetNavMenu is navigation overlay
         if (targetNavMenu.classList.contains("navigation-overlay")) {
            document.body.classList.add("overflow-hidden");
            focusTrap(targetNavMenu);
         }
      }

      // hide menu
      function hideMenu(targetNavItem, targetNavMenu) {
         window.hide(targetNavMenu, options);

         // set focus back on original navItem
         targetNavItem.focus();
      }

      // toggle active navItem
      function toggleNavItem(targetNavItem) {
         // toggle active navItem
         let active = document.querySelector(".navigation-item .menu-open");
         if (active) {
            active.classList.remove("menu-open");
            active.setAttribute("aria-expanded", "false");
         }

         // toggle target navItem
         if (targetNavItem !== active) {
            targetNavItem.classList.add("menu-open");
            targetNavItem.setAttribute("aria-expanded", "true");
         } else {
            targetNavItem.classList.remove("menu-open");
            targetNavItem.setAttribute("aria-expanded", "false");
         }
      }


      let prevScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let prevScrollDirection = '';

      window.addEventListener('scroll', function() {
         const st = window.pageYOffset || document.documentElement.scrollTop;
         // console.log("st: " + st);
         if (st > prevScrollTop && prevScrollDirection !== 'down') {
            // downscroll code here
            prevScrollDirection = 'down';
            // console.log(prevScrollDirection);
            if ($("header").hasClass("showmenu")) {
               $("header").removeClass("showmenu");
               hideOpenMenuOnDemand();
            }
         }
         else if (st < prevScrollTop && prevScrollDirection !== 'up') {
            // upscroll code
            prevScrollDirection = 'up';
            // console.log(prevScrollDirection);
            if (!$("header").hasClass("showmenu")) {
               $("header").addClass("showmenu");
            }
         }
         prevScrollTop = st <= 0 ? 0 : st; // for Mobile or negative scrolling
      }, false);

      const el = document.querySelector("header");
      
      // active navItem
      function activeNavItem(targetNavItem) {
         targetNavItem.classList.add("menu-open");
         targetNavItem.setAttribute("aria-expanded", "true");
      }

      // inactive navItem
      function inactiveNavItem(targetNavItem) {
         targetNavItem.classList.remove("menu-open");
         targetNavItem.setAttribute("aria-expanded", "false");
      }

      // toggle menu states
      function toggleMenu(targetNavItem, navMenus) {
         // forEach menu
         if (options === undefined) {
            options = window.options;
         }

         navMenus.forEach(function(targetNavMenu){
            // toggle based off current state
            if (targetNavMenu.getAttribute("id") === targetNavItem.getAttribute("data-target").substring(1)) {
               if (targetNavMenu.classList.contains(options.stateClosed)) {
                  showMenu(targetNavItem, targetNavMenu, navMenus);
               } else if (targetNavMenu.classList.contains(options.stateOpened)) {
                  hideMenu(targetNavItem, targetNavMenu);
               }
            } else {
               if (targetNavMenu.classList.contains(options.stateOpened)) {
                  hideMenu(targetNavItem, targetNavMenu);
               }
            }
         });
      }

      // focus trap
      function focusTrap(el) {
         // set focusable elements
         let focusableEl = el.querySelectorAll(
            "a[href]:not([disabled]), button:not([disabled]), " +
               "textarea:not([disabled]), input[type=\"text\"]:not([disabled]), input[type=\"radio\"]:not([disabled]), " +
               "input[type=\"checkbox\"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex=\"-1\"]"
         );

         if (focusableEl.length > 0) {
            let firstFocusableEl = focusableEl[0];
            let lastFocusableEl = focusableEl[focusableEl.length - 1];

            // set focus on first focusable element
            firstFocusableEl.focus();
            let keyCodeTab = 9;
            el.addEventListener("keydown", function(e) {
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
      }

      function hideOpenMenuOnDemand() {
            // forEach menu
            let navMenus = document.querySelectorAll(".navigation-menu");
            navMenus.forEach(function(targetNavMenu){
               // if menu state is opened
               if(targetNavMenu.classList.contains(options.stateOpened)){
                  let targetNavItem = document.querySelector(".has-menu.menu-open");
      
                  inactiveNavItem(targetNavItem);
                  window.hide(targetNavMenu, options);
               }
            });
            //this.removeEventListener("click", _f);
      }

      document.addEventListener("click", function _f(event) {
         // console.log(event);
         //if we are clicking IN the menu, don't close. 
         if ($(event.target).parents(".navigation-menu.is-visible").length == 0) {
            hideOpenMenuOnDemand();
         }
      });

      // dropdown focus
      function dropdownFocus(el, targetNavItem, navMenus) {
         // set focusable elements
         let focusableEl = el.querySelectorAll(
            "a[href]:not([disabled]), button:not([disabled]), " +
               "textarea:not([disabled]), input[type=\"text\"]:not([disabled]), input[type=\"radio\"]:not([disabled]), " +
               "input[type=\"checkbox\"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex=\"-1\"]"
         );
         if (focusableEl.length > 0) {
            let firstFocusableEl = focusableEl[0];
            let lastFocusableEl = focusableEl[focusableEl.length - 1];
            let keyCodeTab = 9;

            // menu event listener
            el.addEventListener("keydown", function(e) {
               if (e.key === "Tab" || e.keyCode === keyCodeTab) {
                  if (e.shiftKey) {
                     if (document.activeElement === firstFocusableEl) {
                        if(!el.classList.contains(options.stateOpened)){
                           inactiveNavItem(targetNavItem);
                           window.hide(el, options);
                        }
                     }
                  } else {
                     if (document.activeElement === lastFocusableEl) {
                        inactiveNavItem(targetNavItem);
                        window.hide(el, options);
                     }
                  }
               }
            });
            // nav item event listener
            targetNavItem.addEventListener("keydown", function(e) {
               if (e.key === "Tab" || e.keyCode === keyCodeTab) {
                  if (e.shiftKey) {
                     inactiveNavItem(targetNavItem);
                     window.hide(el, options);
                  }
               }
            });
            // document event listener
            document.addEventListener("click", function _f() {
               // forEach menu
               navMenus.forEach(function(targetNavMenu){
                  // if menu state is opened
                  if(targetNavMenu.classList.contains(options.stateOpened)){
                     targetNavItem = document.querySelector(".navigation-item .menu-open");

                     inactiveNavItem(targetNavItem);
                      window.hide(targetNavMenu, options);
                  }
               });
               this.removeEventListener("click", _f);
            });
         }
      }

      // for each navItems
      navItems.forEach(function(targetNavItem){

         // if targetNavItem has menu
         if (targetNavItem.querySelector(".has-menu")) {

            targetNavItem = targetNavItem.querySelector(".has-menu");


            // on click
            targetNavItem.addEventListener("click", function(e) {
               // debugger;
               let navMenus = document.querySelectorAll(".navigation-menu");
               // console.log(navMenus);
               e.preventDefault();
               // e.stopPropagation();
               // e.stopImmediatePropagation();
               toggleNavItem(targetNavItem);
               toggleMenu(targetNavItem, navMenus);
            });
         }

         // if targetNavItem has overlay
         if (targetNavItem.querySelector(".has-overlay")) {

            targetNavItem = targetNavItem.querySelector(".has-overlay");

            // on click
            targetNavItem.addEventListener("click", function(e) {
               let navMenus = document.querySelectorAll(".navigation-overlay");
               toggleNavItem(targetNavItem);
               toggleMenu(targetNavItem, navMenus);
               e.preventDefault();
            });
         }

         // if targetNavItem has dropdown
         if (targetNavItem.querySelector(".has-dropdown")) {

            targetNavItem = targetNavItem.querySelector(".has-dropdown");
            let targetNavMenu = targetNavItem.parentElement.querySelector(".navigation-dropdown");
            let navMenus = document.querySelectorAll(".navigation-dropdown");

            // on hover (uses hover intent plugin: optional)
            hoverintent(targetNavItem.parentElement, () => {
               // mouseenter
               activeNavItem(targetNavItem);
               window.show(targetNavMenu, options);
            }, () => {
               // mouseleave
               inactiveNavItem(targetNavItem);
               window.hide(targetNavMenu, options);
            });

            // keyboard focus
            targetNavItem.addEventListener("focus", function() {
               if(!targetNavMenu.classList.contains(options.stateOpened)){
                  activeNavItem(targetNavItem);
                  window.show(targetNavMenu, options);
                  dropdownFocus(targetNavMenu, targetNavItem, navMenus);
               }
            });

         }
      });
   }



   function hideSearchButton() {
      if (document.getElementById('edit-keys') !== null) {
         var searchButton = document.createElement("button");
         searchButton.setAttribute('aria-label', 'Search button');
         searchButton.classList.add('btn');
         document.getElementById("edit-actions").appendChild(searchButton);
         document.getElementById("edit-submit-search").style.display = "none";
      }
   }

   // init functions
   $(document).ready(function() {
      initNavigation();

      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//investors.danaher.com/js/wd_widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","prn_wjs");
   });
   // hideSearchButton();
}(hoverintent, window.options, window.show, window.hide, jQuery));
