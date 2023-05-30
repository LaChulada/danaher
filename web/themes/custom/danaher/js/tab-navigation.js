'use strict';

(function($) {
    function initTabNavigation() {
        $(document).ready(function() {

            function updatePagination(paginationNode) {
                let $links = jQuery(".tab-navigation").siblings(".tab-overflow").find(".nav-tabs").find("a");
                let $activeLink = jQuery(".tab-navigation").siblings(".tab-overflow").find(".nav-tabs").find("a.active");
                let $idx = $links.index($activeLink) + 1;
                $(paginationNode).text($idx);
            }


            $(".tab-overflow .nav-tabs a").on("click", function(event) {
                let paginationNode = $(".tab-navigation .prev").siblings(".pagination").find(".current");
                updatePagination(paginationNode);
            });

            $(".tab-navigation .next").on("click", function(event) {
                // console.log("clicked tab navigation next");
                let $tabs = $(".tab-navigation").siblings(".tab-overflow").find(".nav-tabs");
                let $currentActive = $($tabs).find("a.active");
                let $nextLink = $($currentActive).parent().next().find("a");
                if ($nextLink.length == 0) {
                    $nextLink = $(".tab-navigation").siblings(".tab-overflow").find(".nav-tabs").find("a:first");
                }
                //click on next link
                $($nextLink)[0].click();

                let paginationNode = $(".tab-navigation .prev").siblings(".pagination").find(".current");
                updatePagination(paginationNode);
            });

            $(".tab-navigation .prev").on("click", function(event) {
                // console.log("clicked tab navigation next");
                let $tabs = $(".tab-navigation").siblings(".tab-overflow").find(".nav-tabs");
                let $currentActive = $($tabs).find("a.active");
                let $prevLink = $($currentActive).parent().prev().find("a");
                if ($prevLink.length == 0) {
                    $prevLink = $(".tab-navigation").siblings(".tab-overflow").find(".nav-tabs").find("a:last");
                }
                //click on next link
                $($prevLink)[0].click();

                let paginationNode = $(".tab-navigation .prev").siblings(".pagination").find(".current");
                updatePagination(paginationNode);
            });
        });
    }
 
    // init functions & events
    // --------------------------------------------------
    initTabNavigation();
 })(jQuery);
 