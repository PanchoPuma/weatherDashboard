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
                    var weatherIcon = ("<img src='https://openweathermap.org/img/w/" + details.weather[0].icon + ".png' alt='" + details.weather[0].main + "' />")
                    console.log (weatherIcon);

                    displayRecords (details.name, details.main.temp, details.main.humidity, details.wind.speed, weatherIcon);
                    getUVIndexData (details.coord.lat, details.coord.lon)
                })
            }
        })
        .catch(function(error) {
            alert("Unable to connect");
        })
}

// Function to get the UVIndex Data

var getUVIndexData = function (lat, lon) {
    var oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=daily&appid=" + APIkey;
    console.log (oneCallAPI);
    //debugger;
    fetch (oneCallAPI)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (details){
                    console.log (details.current.uvi);// uvi
                    displayUVIndexData (details.current.uvi)
                })
            }
        })
        .catch(function(error) {
            alert("Unable to connect");
        })
}

//Function to display the records minus the UVIndex

var displayRecords = function(name,temp,humidity,windSpeed,weatherIcon){
    var currentDate = moment().format("MMM Do YYYY");
    currentCity.innerHTML = (name) + " - " + (currentDate) + " " + (weatherIcon);
    currentTemperature.innerHTML = "Temperature: " + (temp) + " " + "°C";
    currentHumidity.innerHTML = "Humidity: " + (humidity)+ " " + "%";
    currentWS.innerHTML = "Wind Speed: " + (windSpeed)+ " " + "Km/h";
}

//Create a function to display Uv index similar to previous functions 

var displayUVIndexData = function (uvi) {
    uvIndex.innerHTML = (uvi);
    if (uvi = 0 || 1 || 2) {
        uvIndex.className = "bg-gradient bg-success"
    }
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
// searchCityButton.addEventListener("click",getUVIndexData);
existingList ();