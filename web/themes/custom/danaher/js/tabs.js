'use strict';

(function (Tab) {
   // add options / events here

   // init bootstrap native tab
   [].forEach.call(document.querySelectorAll("[data-toggle=\"tab\"]"), (element) => {
      new Tab(element);
   });
})(Tab);
