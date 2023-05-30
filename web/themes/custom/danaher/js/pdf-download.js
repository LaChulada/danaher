'use strict';

(function($) {
    function downloadBegin() {
     
        function downloadFile(file) {


            if (file.length == 0) {
                return;
            }

            window.open(file, "_blank");

            // // Create a link and set the URL using `createObjectURL`
            // const link = document.createElement("a");
            // link.style.display = "none";
            // link.href = URL.createObjectURL(file);
            // link.download = file.name;
          
            // // It needs to be added to the DOM so it can be clicked
            // document.body.appendChild(link);
            // link.click();
          
            // // To make this work on Firefox we need to wait
            // // a little while before removing it.
            // setTimeout(() => {
            //   URL.revokeObjectURL(link.href);
            //   link.parentNode.removeChild(link);
            // }, 0);
          }

        $('.pdf-dl input[type="button"]').on("click", function(event) {
            var newFile = $("#pdf-dl-select").val();

            // const myFile = new File([`${new Date()}: Meow!`], newFile);

            downloadFile(newFile);
            event.preventDefault();
        });
    }
 
    downloadBegin();
 })(jQuery);
 