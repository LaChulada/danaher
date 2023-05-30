'use strict';

(function($) {

    function switchPanel(oldPanel, newPanel, event) {
        $(oldPanel).hide();
        $(newPanel).show();

        if ($(newPanel).hasClass("related")) {

            var newTitle = $(event.currentTarget).text().trim();
            $(".related .eyebrow").text(newTitle);

            //the carousel throws errors when it's hidden, so do throw a resize event at the carousel.
            const url = new URL(window.location);
            var newTopic = $(event.currentTarget).data("tid");
            url.searchParams.set('tid', newTopic);
            window.history.pushState({}, '', url);

            $(".slick--view--related-articles").resize();
            $(".recirculation select").val(newTopic).change();

            //set the dropdown to the newTopic ID
        }
        document.getElementsByClassName("quiz")[0].scrollIntoView({behavior: 'smooth'}, true);
        // $(oldPanel).removeAttr("aria-live").removeAttr("aria-atomic");
        // $(newPanel).attr("aria-live", "polite").attr("aria-atomic", "true");
        $(newPanel).focus();
    } 

    function startQuiz() {
        $(document).ready(function() {
            //if I include a second form, for some reason they appear back to back and it's not making sense. So - duplicate the form
            //var $form = $('.originalform').clone();
            //$('.dupeform').html($form);

            $(".panel a[data-panel]").on("click", function(event) {
                // debugger;
                event.preventDefault();

                var panelInfo = $(this).data("panel");
                var newPanel = $(this).parents(".quiz").find(".panel." + panelInfo)[0];
                switchPanel($(event.currentTarget).parents(".panel"), newPanel, event);          
            });
        });
    }
 
    startQuiz();
 })(jQuery);
 