//Variables from the HTML
var searchCityButton= document.querySelector("#searchCityButton")

// variables
var APIkey = "b1d0aae8e0d8743f9981d6a87d77d2bb";
var cityList = []

//functions

var getCityData = function() {
    var city = $("#searchCityForm").val();

    saveCity(city);

    var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&exclude=daily&appid="+ APIkey
    console.log (openWeatherAPI);
    fetch (openWeatherAPI)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (details){
                    console.log (details)// all details
                    console.log (details.name)// name of the city 
                    console.log (details.main.temp) //current temperature
                    console.log (details.main.humidity) //current Humidity
                    console.log (details.wind.speed) //current Wind Speed

                    //insert call to function to display data with 4 parameters
                })
            }
        })
        .catch(function(error) {
            alert("Unable to connect");
        })
}

//create a function to display the records 

//create a function to load and display existing city names

var existingList = function () {
    
}

//create a function to store the city name and display it in the list
var saveCity = function (city) {
        if (city === ""){
            window.alert("Please enter a city name");
        //debugger;
        } else {
           var existing = localStorage.getItem ("Cities");
           console.log (existing)
            if (existing === null) {
                cityList = [];
                } else {
                cityList = JSON.parse(existing);
                }
           //debugger;
           cityList.push (city);
            localStorage.setItem ("Cities", JSON.stringify(cityList)) 
        }
    }





searchCityButton.addEventListener("click",getCityData);