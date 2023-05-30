'use strict';

(function($) {

    if ($(".main-search-page").length == 0) {
        $("#edit-keys").val("");
    }

    function clearSearch() {
        document.getElementById('views-exposed-form-search-content-search').reset();
        $("#edit-keys").val("");
        $("#views-exposed-form-search-content-search input#edit-keys").focus();
    }


    function addClearField() {
        if ($(".main-search-page").length > 0) {
            $(".main-search-page #views-exposed-form-search-content-search .js-form-item").addClass("search-custom");
            let buttonHTML = '<button class="clear">Clear</button>';
            $(".main-search-page #views-exposed-form-search-content-search .js-form-item #edit-keys").attr("placeholder", "Start typing to search");
            $(".main-search-page #views-exposed-form-search-content-search .js-form-item #edit-keys").after(buttonHTML);

            document.querySelector('.main-search-page #views-exposed-form-search-content-search .js-form-item').addEventListener('click', function(event) {
                if (event.target.tagName.toLowerCase() === 'button') {
                    clearSearch();
                    event.preventDefault();
                }
              });
        }
    }



    $("button.clear").on("click", function(event) {
        clearSearch();
        event.preventDefault();
        // event.stopPropagation();
    });

    $("#views-exposed-form-search-content-search #edit-keys").on('keydown', function (e) {
        if (e.keyCode == 13) {
          $('#views-exposed-form-search-content-search').submit();
        }
    });

    function hasSupports() {
        // if not supported
        if(!CSS.supports('selector(html:has(body))')) { 

            //firefox doesn't support the :has directive, so I'm going to apply a class that mimics its usage
            if ($('.blog-hero-right-side').find('figure').length > 0) {
                $('.hero--blog').addClass('has-image'); 
            }

            if ($('.hero--2-up-hero').find('figure').length > 0) {
                $('.hero--2-up-hero').addClass('has-image'); 
            }

            Array.from(jQuery('.dynamic-quote-block--item')).forEach( function(element) {
                    // console.log(element);
                    if ($(element).find('.decorative-image').length > 0) {
                        $(element).addClass('has-decorative-image');
                    } else {
                        $(element).addClass('no-decorative-image');
                    }
                });
          }
    }

    function isElementInViewport (el) {

        // Special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
    
        if (el === undefined || el === null) {
            return false;
        }
        var rect = el.getBoundingClientRect();
    
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }

    function adjustHomepage() {
        if ($(".hero--immersive").length > 0) {

            if ($("#block-alertbanner").length > 0) {
                $(".hero--immersive-wrapper-first-pane").addClass("has-alert");
            } else {
                $(".hero--immersive-wrapper-first-pane").removeClass("has-alert");
            }
        }
    }

    $(".scrollitem").on("click", function(event) {
        $('html, body').animate({scrollTop: $("#quilt").offset().top - 50 - $("#header").innerHeight() }, 750);
    });


    function getMaxHeight(el) {
        let maxheights = []; 
        maxheights = Array.from(jQuery(el).find("[data-columns] .stacked-heading")).map(item => jQuery(item).outerHeight());
        let mh =  Math.max.apply(null, maxheights);
        jQuery(el).find("[data-columns] .stacked-heading").css('min-height', mh + "px");
    }

    function resizeStackedCapabilityColumns() {
        Array.from(jQuery(".stacked-capability-column")).forEach(item => getMaxHeight(item));
    }
    
    resizeStackedCapabilityColumns();

    function focusOnSearch() {
        setTimeout('document.querySelector("ul.menu a.search").focus()', 500);
        document.querySelector("#search-panel").scrollIntoView({behavior: 'smooth'}, true);
    }

    function nav() {
     
        $("ul.menu a.search, .search-close").on("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            if ($("#search-panel").length > 0) {
                $("#search-panel").toggle("slow", function() {
                    //hey, is a mobile menu open? close it
                    if (window.innerWidth < 1200 && isElementInViewport($(".region-primary-menu-mobile"))) {
                        if ($(".region-primary-menu-mobile")[0].getBoundingClientRect().width !== 0) {
                            $(".region-primary-menu-mobile").toggle();
                            $("#menu_checkbox").prop('checked', false);
                        }
                    }

                    //hey, is a desktop menu open, close it
                    if (window.innerWidth >= 1200 && isElementInViewport($(".navigation-menu.is-visible"))) {
                        let active = document.querySelector(".navigation-item .menu-open");
                        if (active) {
                            active.classList.remove("menu-open");
                            active.setAttribute("aria-expanded", "false");
                        }

                        let targetNavItem = $(".menu-item.navigation-menu.is-visible");
                        targetNavItem.removeClass("is-visible").addClass("is-hidden");
                        targetNavItem.attr("aria-hidden", "true");
                    }

                    if (isElementInViewport($("#search-panel"))) {
                        //now once the search panel is open, let's make it focus in the edit text box
                        setTimeout('document.querySelector("#search-panel #edit-keys").focus()', 500);
                    } else {
                        //if it's not ope, focus on the search button
                        // setTimeout('document.querySelector("ul.menu a.search").focus()', 500);
                        focusOnSearch();
                    };
                  });
            } else {
                setTimeout('document.querySelector("#edit-keys").focus()', 500);
            }
        });

        function openMobileNavTopLevel() {
            $(".region-primary-menu-mobile").toggle();
        }

        $("label.hbm").on("click", function(event) {
            openMobileNavTopLevel();
        });

        $("label.hbm").keypress(function (e) {
            var key = e.which;
            if(key == 13)  // the enter key code
             {

                var isChecked = $("#menu_checkbox").prop('checked');
                if (isChecked) {
                    $("#menu_checkbox").prop('checked', false);
                } else {
                    $("#menu_checkbox").prop('checked', true);
                }
                openMobileNavTopLevel();
                return false;  
             }
           });   

        function openFooterAccordions() {
            // console.log(window.innerWidth);
            // debugger;
            let trigger = '.site-footer .accordion .collapse-trigger';
            let target =  '.site-footer .accordion .collapse-target';
            if (window.innerWidth > 992) {
                $(trigger).removeClass("collapsed").attr("aria-expanded", "true");
                $(target).removeClass("collapsed collapse").addClass("show").attr("aria-expanded", "true");
            } else {
                // debugger;
                $(trigger).not('[date-stayopen="true"]').addClass("collapsed").attr("aria-expanded", "false");
                $(target).not(jQuery('[date-stayopen="true"]').siblings(".collapse-target")).addClass("collapsed collapse").removeClass("show").attr("aria-expanded", "false");

                jQuery('[date-stayopen="true"]').trigger("click");
                jQuery('[date-stayopen="true"]').attr("aria-expanded", "true");
                jQuery('[date-stayopen="true"]').hide();
                jQuery('[date-stayopen="true"]').siblings(".collapse-target").addClass("show").attr("aria-expanded", "true");
            }
        }

        var debounceResize = Drupal.debounce(function() {
            openFooterAccordions()
          }, 250);
          
         window.addEventListener('resize', debounceResize);
          
         openFooterAccordions();
    }
 
    nav();

    $(document).ready(function() {
        hasSupports();
        adjustHomepage();
        // addClearField();
     });

 })(jQuery);
 