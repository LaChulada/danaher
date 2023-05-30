'use strict';

(function () {
   // init bootstrap native collapse
   [].forEach.call(document.querySelectorAll("[data-toggle=\"collapse\"]"), (element) => {
      new Collapse(element);
   });
})();
