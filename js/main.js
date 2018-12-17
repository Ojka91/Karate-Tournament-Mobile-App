//vue instance

var myApp = new Vue({
    el: '#app',
    data: {
        page: 'home',
        states: '',
        teams: myTeams,
        filteredTeams: myTeams,
        location: '',
        direction: '',
        map: '',
        participants: data.participants,
        classPre: data.classification[0].pre,
        descriptions: '',
        name: '',
        auth: false,

    },

    methods: {
        //display the description of the players
        description: function (des) {
            this.name = des;
            for (var x = 0; x < data.participants.length; x++) {

                if (this.name.match(data.participants[x].name)) {
                    this.descriptions = data.participants[x].description;
                }
            }
        },

        //write the post to firebase database
        writeNewPost: function () {

            // https://firebase.google.com/docs/database/web/read-and-write

            var textToSend = document.getElementById("textInput").value;
            // Values
            var message = {
                message: textToSend,
                name: firebase.auth().currentUser.displayName,
            }
            console.log(message);


            firebase.database().ref('karate-tournament').push(message)
            // A post entry.

            // Get a key for a new Post.

            //Write data+
         
            console.log("write");
            this.getPosts()
        },

        //get posts from firebase database and print them 
        getPosts: function () {

            firebase.database().ref('karate-tournament').on('value', function (data) {
                var mes = document.getElementById("messages");
                mes.innerHTML = "";

                var messages = data.val();

                for (var key in messages) {
                    var text = document.createElement("div");
                    text.setAttribute("class", "textchat");
                    var element = messages[key];

                    text.append(element.name + ":" + " " + element.message);
                    mes.append(text);

                    if (element.name == firebase.auth().currentUser.displayName) {
                        text.setAttribute("class", "owner");
                    }
                    if (element.name != firebase.auth().currentUser.displayName) {
                        text.setAttribute("class", "other");
                    }
                    console.log("insidechat")
                }
                mes.scrollTop = mes.scrollHeight;
            })


            console.log("getting posts");

        },

        //create the login function and swap to chat webpage
        login: function () {
            // https://firebase.google.com/docs/auth/web/google-signin
            console.log('here');
            // Provider
            var provider = new firebase.auth.GoogleAuthProvider();
            // How to Log In
            // How to Log In
            firebase.auth().signInWithPopup(provider).then(function () {
                myApp.getPosts();
                myApp.swap("chat");
                myApp.auth = true;
            });
        },
        logout: function (){
            firebase.auth().signOut().then(function() {
                myApp.swap('login');
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
        },
        //function that change pages SPA
        swap: function (id) {
            console.log(id);
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


                } else if (document.getElementById("kumite").checked && document.getElementById("kataf").checked) {
                    this.filteredTeams.push(this.teams[x]);

                } else if (document.getElementById("kumite").checked && this.teams[x].kumite.name && document.getElementById("kataf").checked === false) {

                    this.filteredTeams.push(this.teams[x]);


                } else if (document.getElementById("kataf").checked && this.teams[x].kata.name && document.getElementById("kumite").checked === false) {

                    this.filteredTeams.push(this.teams[x]);


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