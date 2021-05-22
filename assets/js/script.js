//Variables from the HTML
var searchCityButton= document.querySelector("#searchCityButton")

// variables
var APIkey = "b1d0aae8e0d8743f9981d6a87d77d2bb";

//functions

var getCityData = function() {
    var city = $("#searchCityForm").val();

    //insert call to function to store city name

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

//create a function to load existing city names

//create a function to store the city name and display it in the list





searchCityButton.addEventListener("click",getCityData);