// import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
'use strict';


(function() {
Vue.createApp({

    data() {
        return {
            message: 'Hello Vue!',
            img1: './assets/GettyImages-11997063212.png',
            stage: 0,
            quilt: '',
            hovered: false,
            observer: '',
            count: 0

        }
    },

    mounted() {

        // this.quilt = document.querySelectorAll(".quilt--image__container");
        this.quilt = document.querySelectorAll(".hero--article--quilt-item");

        
        // console.log(this.quilt);
     
        this.observer = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
                // debugger;

                if (Array.from(entry.target.children[0].children[0].classList).includes('quilt--image__mask__left')) {
                    entry
                    .target
                    .children[0]
                    .children[0]
                    .classList
                    .toggle("show", entry.isIntersecting);
                }




            

                if (entry.target.children[0].children.length > 2) {

                        // entry.target.children[1] is the background
                        if (Array.from(entry.target.children[1].classList).includes('quilt--bg')) {
                            entry
                                .target
                                .children[1]
                                .classList
                                .toggle("quilt--bg__fromright", entry.isIntersecting)
                            entry
                                .target
                                .children[1]
                                .classList
                                .toggle("quilt--bg__animation", entry.isIntersecting)
        
                        }

                    //the items with images on the right also have a hidden mobile image (and we hide the other image for a11y reasons). So let's allow that image to be shown properly
                    if (Array.from(entry.target.children[0].children[0].classList).includes('mobile')) {
                        entry
                            .target
                            .children[0]
                            .children[0]
                            .firstElementChild
                            .classList
                            .toggle("show", entry.isIntersecting);
                    }

                    entry
                        .target
                        .children[0]
                        .children[1]
                        .classList
                        .toggle("quilt--textfadein", entry.isIntersecting);

                    //this is the desktop right side image
                    if (Array.from(entry.target.children[0].children[2].classList).includes('quilt--image__mask__right')) {
                        entry
                        .target
                        .children[0]
                        .children[2]
                        .classList
                        .toggle("show", entry.isIntersecting);
                    }
                } else {
                    // entry.target.children[1] is the background
                    if (Array.from(entry.target.children[1].classList).includes('quilt--bg')) {
                        entry
                            .target
                            .children[1]
                            .classList
                            .toggle("quilt--bg__animation", entry.isIntersecting)
    
                    }
                }


                if (entry.isIntersecting) 
                    this
                        .observer
                        .unobserve(entry.target);

                  entry
                  .target
                  .children[0].children[0]
                  .onanimationend = () => {
                      // console.log("animation has ended")
                      entry
                          .target
                          .children[0]
                          .children[1]
                          .classList
                          .toggle("quilt--textfadein", entry.isIntersecting)

                  }
                

              //check if it's a even number and asign css
                if (this.stage % 2 !== 0) {
                    entry
                    .target
                    .children[0]
                    .children[0]
                    .classList
                    .toggle("quilt--textfadein", entry.isIntersecting)

                    entry
                        .target
                        .children[0]
                        .children[0]
                        .classList
                        .toggle("quilt--text__right", entry.isIntersecting)

                    }
                if (this.stage % 2 == 0) {
               
                    entry
                        .target
                        .children[0]
                        .children[1]
                        .classList
                        .toggle("quilt--textfadein", entry.isIntersecting)
                    }

                entry
                    .target
                    .children[0]
                    .children[1]
                    .onanimationend = () => {
                        this.stage = this.stage + 1;
              
                    }
                })
        }, {
          // when the animation is going to start
          threshold: 0.25,
          rootMargin: "100px 0px 0px 100px"
        })
        if (this.stage == 0) {
        
            this
                .observer
                .observe(this.quilt[0])
        }

    },
    watch: {

      //check chich animation is played make sure everything in the order.
        stage(newStage, oldStage) {

           
            if (newStage == this.stage & newStage < 4) {
                this
                    .observer
                    .observe(this.quilt[this.stage])
            }
      

        }

    },
    methods: {
        callObserver(myStage) {
            this
                .observer
                .observe(this.quilt[myStage])

        },
        mouseOver() {
            console.log('clcked')
        }

    }

}).mount('#app')

})();