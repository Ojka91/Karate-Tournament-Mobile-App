var myApp = new Vue({
    el: '#app',
    data: {
        page: 'home',
        states: '',
        teams: myTeams,
        filteredTeams: myTeams,
        location: '',
        direction: '',
        map:'',
        participants: data.participants,
        classPre: data.classification[0].pre,
        descriptions:'',
        name:'',
    },
    computed:{
        filters2(){
            return this.teams.filter(team => {
                var ku = document.getElementById("kumite").checked && team.kumite.name;
                var ka = document.getElementById("kataf").checked && team.kata.name;
                
                return ku || ka;
            })
        }
    },
    methods: {
        
        description: function (des){
            this.name = des;
            for(var x = 0; x<data.participants.length; x++){
                
                if (this.name.match(data.participants[x].name) ){
                    this.descriptions = data.participants[x].description;
                }
            }
        },
        
        //function that change pages SPA
        swap: function (id) {
            this.page = id;

            //remove "show" class on menu when changing page
            var show = document.querySelector(".show");
            if (show) {
                show.classList.remove("show");
            }
        },
        
        //function that filters teams
        filters: function () {
            this.filteredTeams = []
            for (var x = 0; x < this.teams.length; x++) {
                
                if (document.getElementById("kumite").checked === false && document.getElementById("kataf").checked === false) {
                    this.filteredTeams.push(this.teams[x]);
                  

                }
                else if (document.getElementById("kumite").checked && document.getElementById("kataf").checked) {
                    this.filteredTeams.push(this.teams[x]);

                }

                
                else if (document.getElementById("kumite").checked && this.teams[x].kumite.name && document.getElementById("kataf").checked === false) {

                        this.filteredTeams.push(this.teams[x]);

                        if (this.teams[x].kata) {

//                            delete this.filteredTeams[this.filteredTeams.length - 1].kata;
                        }
                }
                
                else if (document.getElementById("kataf").checked && this.teams[x].kata.name && document.getElementById("kumite").checked === false) {

                    this.filteredTeams.push(this.teams[x]);

                    if (this.teams[x].kumite) {

//                        delete this.filteredTeams[this.filteredTeams.length - 1].kumite;
                    }
                }
            }
        },
        
    }
});



var countries = [];

myApp.states = countries;
var myTeams = data.teams;
myApp.teams = myTeams;
myApp.filteredTeams = myTeams;
myApp.location = data.location[0].iframe;
myApp.direction = data.location[0].direction;
myApp.directionName = data.location[0].name;




arrayCountries();










//this function sort by country the teams population
myTeams.sort(function (a, b) {
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
function arrayCountries() {
    for (var x = 0; x < data.participants.length; x++) {
        if (!countries.includes(data.participants[x].country_id)) {
            countries.push(data.participants[x].country_id);
        }
    }
    countries.sort();
}
