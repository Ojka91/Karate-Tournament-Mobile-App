var myApp = new Vue({
    el: '#app',
    data: {
        page: 'home',
        states: '',
        teams: '',
    },
    methods: {
        swap: function (id) {
            this.page = id;
            
            //remove "show" class on menu when changing page
            var show = document.querySelector(".show");
            if(show){
                show.classList.remove("show");
            }
        },
    }
});




var countries = [];

myApp.states = countries;
var myTeams= data.teams;
myApp.teams = myTeams;



arrayCountries();









//this function sort by country the teams population
myTeams.sort(function(a, b) {
  var nameA = a.country.toUpperCase(); // ignore upper and lowercase
  var nameB = b.country.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});





//create variables for dropdown filter teams by country
function arrayCountries(){
    for (var x = 0; x<data.participants.length; x++){
          if (!countries.includes(data.participants[x].country_id)){countries.push(data.participants[x].country_id);
}
    }
    countries.sort();
}





