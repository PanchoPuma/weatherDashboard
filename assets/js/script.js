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

//Function to load and display existing city names
var existingList = function () {

    var storedCityList = localStorage.getItem("Cities");
    storedCityList = JSON.parse(storedCityList);

   //console.log(storedCityList);
    //debugger;

    if (storedCityList != null) {

        for (var i = 0; i < storedCityList.length; i++) {

        var cityButtonLoading = document.createElement("button");
        cityButtonLoading.textContent = (storedCityList[i]);
        cityButtonLoading.className = "my-1"
        previousSearchHistory.appendChild(cityButtonLoading);

        }
    }
}

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
                    // console.log (details);// all details
                    // console.log (details.name);// name of the city 
                    // console.log (details.main.temp); //current temperature
                    // console.log (details.main.humidity);//current Humidity
                    // console.log (details.wind.speed); //current Wind Speed
                    // console.log (details.sys.country); //city's country
                    var weatherIcon = ("<img src='https://openweathermap.org/img/w/" + details.weather[0].icon + ".png' alt='" + details.weather[0].main + "' />")
                    //console.log (weatherIcon);

                    displayRecords (details.name, details.main.temp, details.main.humidity, details.wind.speed, weatherIcon);
                    getUVIndexData (details.coord.lat, details.coord.lon);
                    getFutureCityData (details.name, details.sys.country);
                })
            }
        })
        .catch(function(error) {
            alert("Unable to connect");
        })
        $("#searchCityForm").val("")
}

//Function to store the city name 
var saveCity = function (city) {
    if (city === ""){
        window.alert("Please enter a city name");
    //debugger;
    } else {
        var existing = localStorage.getItem ("Cities");
        //console.log (existing);
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
            cityButtonSaving.className = "my-1"
            previousSearchHistory.appendChild(cityButtonSaving);
    }
}

// Function to get the UVIndex Data
var getUVIndexData = function (lat, lon) {
    var oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=daily&appid=" + APIkey;
    //console.log (oneCallAPI);
    //debugger;
    fetch (oneCallAPI)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (details){
                    //console.log (details.current.uvi);// uvi
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

//Function to display Uv index similar to previous functions 
var displayUVIndexData = function (uvi) {
    uvIndex.innerHTML = parseFloat(uvi);
    if (uvi >= 0 && uvi <= 2) {
        uvIndex.className = "col-md-1 px-0 mx-0 my-0 green"
    } else if (uvi >= 2.01 && uvi <= 5) {
        uvIndex.className = "col-md-1 px-0 mx-0 my-0 yellow" 
    } else if (uvi >= 5.01 && uvi <= 7) {
        uvIndex.className = "col-md-1 px-0 mx-0 my-0 orange"  
    } else if (uvi >= 7.01 && uvi <= 10) {
        uvIndex.className = "col-md-1 px-0 mx-0 my-0 red"
    } else if (uvi >= 10.01) {
        uvIndex.className = "col-md-1 px-0 mx-0 my-0 red"
    }
}


// Create a function to display 5 day forecast similar to previous functions but miniaturaized!!!!!!!!!

var getFutureCityData = function(city, country) {
    // api to get data by city for 5 days every three hours 
    var futureWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "," +country+"&units=metric&appid="+ APIkey;
    // array positions to be used for once a day (0 (one day) ,8 (two day),16 (three day),24 (four day),32 (fifth day))
    console.log (futureWeatherAPI);
    fetch (futureWeatherAPI)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (details){
                // one day in the future
                // two days in the future
                // three days in the future
                // four days in the future
                // five days in the future



                //sample consol log
                    // one day in the future
                    var oneDay = moment().add(1, 'days').calendar("MMM Do YYYY");
                        //console.log (oneDay);
                    console.log (details.list[0].main.temp);
                    console.log (details.list[0].main.humidity);
                    var weatherIcon = ("<img src='https://openweathermap.org/img/w/" + details.list[0].weather[0].icon + ".png' alt='" + details.list[0].weather[0].main + "' />")
                    console.log (weatherIcon);
                    // two days in the future
                    var twoDays = moment().add(2, 'days').calendar("MMM Do YYYY");
                    console.log (details.list[8].main.temp);
                    console.log (details.list[8].main.humidity);
                    var weatherIcon = ("<img src='https://openweathermap.org/img/w/" + details.list[8].weather[0].icon + ".png' alt='" + details.list[8].weather[0].main + "' />")
                    console.log (weatherIcon);
                    // three days in the future
                    var threeDays = moment().add(3, 'days').calendar("MMM Do YYYY");
                    console.log (details.list[16].main.temp);
                    console.log (details.list[16].main.humidity);
                    var weatherIcon = ("<img src='https://openweathermap.org/img/w/" + details.list[16].weather[0].icon + ".png' alt='" + details.list[16].weather[0].main + "' />")
                    console.log (weatherIcon);
                    // four days in the future
                    var fourDays = moment().add(4, 'days').calendar("MMM Do YYYY");
                    console.log (details.list[24].main.temp);
                    console.log (details.list[24].main.humidity);
                    var weatherIcon = ("<img src='https://openweathermap.org/img/w/" + details.list[24].weather[0].icon + ".png' alt='" + details.list[24].weather[0].main + "' />")
                    console.log (weatherIcon);
                    // five days in the future
                    var fiveDays = moment().add(5, 'days').calendar("MMM Do YYYY");
                    console.log (details.list[32].main.temp);
                    console.log (details.list[32].main.humidity);
                    var weatherIcon = ("<img src='https://openweathermap.org/img/w/" + details.list[32].weather[0].icon + ".png' alt='" + details.list[32].weather[0].main + "' />")
                    console.log (weatherIcon);


                })
            }
        })
        .catch(function(error) {
            alert("Unable to connect");
        })
//     
}
//Create function to click on existing list to display data again !!!!!!!!!!!!!










//Event Listeners and calling Functions 
searchCityButton.addEventListener("click",getCityData);
//searchCityButton.addEventListener("click",getFutureCityData);
existingList ();