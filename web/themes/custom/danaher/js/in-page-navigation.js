'use strict';

(function($) {
    function inpageNavInit() {

        let lastKnownScrollPosition = 0;
        let ticking = false;

        function moveTopPosition() {
            if ($("header").hasClass("stuck")) {               
                if ($(window).width() > 1200) {
                   $(".table-of-contents--inpage-menu").css("top", ($("header").innerHeight() - 1) + "px");
                } else {
                   $(".table-of-contents--inpage-menu").css("top", "");
                }
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

        function scrollLeft() {
            document.querySelector('.table-of-contents--inpage-menu ul.container').scrollLeft += window.outerWidth
        }
        $(".in-page-navigation .mobile").on("click", function(event) {
            scrollLeft();
            event.preventDefault();
        });

        $(".in-page-navigation .mobile").on("keydown", function(event) {
            if (event.key == " " || event.code == "Space" || event.keyCode == 32    ) {
                scrollLeft();
                event.preventDefault();
            }
        });

        $(".in-page-navigation a").on("click", function(event) {
            // let otherModal = $(event.currentTarget).parents(".speaker--modal");
            // console.log(otherModal);
            let activeLink = $(event.currentTarget).parents(".in-page-navigation").find("a.active");
            activeLink.removeClass("active");
            //$(".modal-backdrop.fade.show").removeClass("show");
            $(this).addClass("active");          

            // let currentBottomOfIPN = $(".in-page-navigation").offset().top + $(".in-page-navigation").height();
            let newTarget = jQuery(event.currentTarget).attr("href");
            newTarget = jQuery(newTarget).offset().top;

            
            let headerOffset = 0;
            headerOffset = $("header").height();

            var target = $(this.hash);
            var headerHeight= $(".table-of-contents--inpage-menu").height();

            if (window.innerWidth > 1200) {
                headerHeight += headerOffset;
            } 
                
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            // console.log(target);
            // console.log(target.offset().top);
            // console.log(headerHeight);
                 
            //weird - I thought my code was causing the browser to miscalculate the top of the div sometimes - nope, it happens even without this in place. 
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        });
    }
 
    inpageNavInit();
 })(jQuery);
 