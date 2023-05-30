'use strict';

(function($) {
    function initPersonModal() {

        $(".btn-close").on("click", function(event) {
            console.log("btn-close clicked");
            // let otherModal = $(event.currentTarget).parents(".speaker--modal");
            // console.log(otherModal);
            let thisModal = $(event.currentTarget).closest(".modal");
            // console.log(thisModal);

            thisModal.hide();
            var thisID = "#" + thisModal.attr("id");
            thisModal.attr('aria-hidden', 'true');
            thisModal.removeClass('show');
            // $(".modal-backdrop.fade.show").removeClass("show")
            $(".modal-backdrop").remove();

            // var esc = $.Event("keydown", { keyCode: 27 });
            // $(thisModal).trigger(esc); // change body to the element where you'd like to execute the escape key press.
            $("button[data-target='" + thisID + "']").focus();
        });
    }
 
    // init functions & events
    // --------------------------------------------------
    initPersonModal();
 })(jQuery);
 