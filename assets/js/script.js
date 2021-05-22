//Variables from the HTML
var searchCityButton = document.querySelector("#searchCityButton");
var previousSearchHistory = document.querySelector("#previousSearchHistory");
var currentCity = document.querySelector("#currentCity");
var currentTemperature = document.querySelector("#currentTemperature");
var currentHumidity = document.querySelector("#currentHumidity");
var currentWS = document.querySelector("#currentWS");
var uvIndex = document.querySelector("#uvIndex");

// variables
var APIkey = "b1d0aae8e0d8743f9981d6a87d77d2bb";
var cityList = [];

//ALL FUNCTIONS

//Function to get city data
var getCityData = function() {
    var city = $("#searchCityForm").val();

    saveCity(city);

    var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&exclude=daily&appid="+ APIkey
    console.log (openWeatherAPI);
    fetch (openWeatherAPI)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (details){
                    console.log (details);// all details
                    console.log (details.name);// name of the city 
                    console.log (details.main.temp); //current temperature
                    console.log (details.main.humidity);//current Humidity
                    console.log (details.wind.speed); //current Wind Speed

                    displayRecords (details.name, details.main.temp, details.main.humidity, details.wind.speed);
                })
            }
        })
        .catch(function(error) {
            alert("Unable to connect");
        })
}

//create a function to display the records 

var displayRecords = function(name,temp,humidity,windSpeed){
    currentCity.innerHTML = (name);
    currentTemperature.innerHTML = "Temperature: " + (temp) + " " + "degrees celsius";
    currentHumidity.innerHTML = "Humidity: " + (humidity);
    currentWS.innerHTML = "Wind Speed: " + (windSpeed);
}

//create function to click on existing list to display data again

//Function to load and display existing city names
var existingList = function () {

    var storedCityList = localStorage.getItem("Cities");
    storedCityList = JSON.parse(storedCityList);

    console.log(storedCityList);
    //debugger;

    if (storedCityList != null) {

        for (var i = 0; i < storedCityList.length; i++) {

        var cityButtonLoading = document.createElement("button");
        cityButtonLoading.textContent = (storedCityList[i]);
        previousSearchHistory.appendChild(cityButtonLoading);

        }
    }
}

//Function to store the city name 
var saveCity = function (city) {
    if (city === ""){
        window.alert("Please enter a city name");
    //debugger;
    } else {
        var existing = localStorage.getItem ("Cities");
        console.log (existing);
            if (existing === null) {
                cityList = [];
            } else {
                cityList = JSON.parse(existing);
            }
            cityList.push (city);
            localStorage.setItem ("Cities", JSON.stringify(cityList));
            //debugger;
            var cityButtonSaving = document.createElement("button");
            cityButtonSaving.textContent = (city);
            previousSearchHistory.appendChild(cityButtonSaving);
    }
}




//Event Listeners and calling Functions 
searchCityButton.addEventListener("click",getCityData);
existingList ();