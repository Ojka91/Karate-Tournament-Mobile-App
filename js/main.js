var myApp = new Vue({
    el: '#app',
    data: {
        page: 'home',
        show: true,

    },
    methods: {
        swap: function (id) {
            this.page = id;
        },
    }
});
