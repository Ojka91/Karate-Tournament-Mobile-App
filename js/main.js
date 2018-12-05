var myApp = new Vue({
    el: '#app',
    data: {
        page: 'home',
        states: '',
        myData: '',
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




var countries = [];
myApp.states = countries;
myApp.myData = data;

arrayCountries();



function arrayCountries(){
    for (var x = 0; x<data.length; x++){
          if (!countries.includes(data[x].country_id)){
                    countries.push(data[x].country_id);
}
    }
    countries.sort();
}

