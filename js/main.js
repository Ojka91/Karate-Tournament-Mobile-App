var myApp = new Vue({
    el: '#app',
    data: {
        page: 'home',
      

    },
    methods: {
        swap: function (id) {
            this.page = id;
            var show = document.querySelector(".show");
            if(show){
                show.classList.remove("show");
            }
            
        },
      
    }
});
