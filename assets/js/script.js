//Variables from the HTML
var searchCityButton = document.querySelector("#searchCityButton");
var previousSearchHistory = document.querySelector("#previousSearchHistory");
var currentCity = document.querySelector("#currentCity");
var currentTemperature = document.querySelector("#currentTemperature");
var currentHumidity = document.querySelector("#currentHumidity");
var currentWS = document.querySelector("#currentWS");
var uvIndex = document.querySelector("#uvIndex");
var clearCityButton = document.querySelector("#clearCityButton");

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
        cityButtonLoading.className = "list-group-item"
        cityButtonLoading.id = JSON.stringify(storedCityList[i]);
        previousSearchHistory.appendChild(cityButtonLoading);

        }
        previousSearchHistory.addEventListener("click", (reinserting));
    }
}

//Function to get city data
var getCityData = function() {
    var city = $("#searchCityForm").val();
    event.preventDefault ();
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
            cityButtonSaving.id = JSON.stringify(city);
            cityButtonSaving.className = " list-group-item"
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
    // array positions to be used for once a day at noon: (4 (one day) ,12 (two day),20 (three day),28 (four day),36 (fifth day))
    console.log (futureWeatherAPI);
    fetch (futureWeatherAPI)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (details){
                // one day in the future
                var oneDay = moment(details.list[4].dt_txt).format('l');
                $("#oneDayAhead").html(oneDay);
                var weatherIcon1 = ("<img src='https://openweathermap.org/img/w/" + details.list[4].weather[0].icon 
                                    + ".png' alt='" + details.list[4].weather[0].main + "' />")
                $("#oneDayAheadIcon").html(weatherIcon1);
                $("#oneDayAheadTemp").html("Temp: " + details.list[4].main.temp + "°C");
                $("#oneDayAheadWind").html("Wind: " + details.list[4].wind.speed + "Km/h");
                $("#oneDayAheadHumidity").html("Humidity: " + details.list[4].main.humidity + "%");
                
                // two days in the future
                var twoDay = moment(details.list[12].dt_txt).format('l');
                $("#twoDayAhead").html(twoDay);
                var weatherIcon2 = ("<img src='https://openweathermap.org/img/w/" + details.list[12].weather[0].icon 
                                    + ".png' alt='" + details.list[12].weather[0].main + "' />")
                $("#twoDayAheadIcon").html(weatherIcon2);
                $("#twoDayAheadTemp").html("Temp: " + details.list[12].main.temp + "°C");
                $("#twoDayAheadWind").html("Wind: " + details.list[12].wind.speed + "Km/h");
                $("#twoDayAheadHumidity").html("Humidity: " + details.list[12].main.humidity + "%");

                // three days in the future
                var threeDay = moment(details.list[20].dt_txt).format('l');
                $("#threeDayAhead").html(threeDay);
                var weatherIcon3 = ("<img src='https://openweathermap.org/img/w/" + details.list[20].weather[0].icon 
                                    + ".png' alt='" + details.list[20].weather[0].main + "' />")
                $("#threeDayAheadIcon").html(weatherIcon3);
                $("#threeDayAheadTemp").html("Temp: " + details.list[20].main.temp + "°C");
                $("#threeDayAheadWind").html("Wind: " + details.list[20].wind.speed + "Km/h");
                $("#threeDayAheadHumidity").html("Humidity: " + details.list[20].main.humidity + "%");

                // four days in the future
                var fourDay = moment(details.list[28].dt_txt).format('l');
                $("#fourDayAhead").html(fourDay);
                var weatherIcon4 = ("<img src='https://openweathermap.org/img/w/" + details.list[28].weather[0].icon 
                                    + ".png' alt='" + details.list[28].weather[0].main + "' />")
                $("#fourDayAheadIcon").html(weatherIcon4);
                $("#fourDayAheadTemp").html("Temp: " + details.list[28].main.temp + "°C");
                $("#fourDayAheadWind").html("Wind: " + details.list[28].wind.speed + "Km/h");
                $("#fourDayAheadHumidity").html("Humidity: " + details.list[28].main.humidity + "%");

                // five days in the future
                var fiveDay = moment(details.list[36].dt_txt).format('l');
                $("#fiveDayAhead").html(fiveDay);
                var weatherIcon5 = ("<img src='https://openweathermap.org/img/w/" + details.list[36].weather[0].icon 
                                    + ".png' alt='" + details.list[36].weather[0].main + "' />")
                $("#fiveDayAheadIcon").html(weatherIcon5);
                $("#fiveDayAheadTemp").html("Temp: " + details.list[36].main.temp + "°C");
                $("#fiveDayAheadWind").html("Wind: " + details.list[36].wind.speed + "Km/h");
                $("#fiveDayAheadHumidity").html("Humidity: " + details.list[36].main.humidity + "%");
                })
            }
        })
        .catch(function(error) {
            alert("Unable to connect");
        })   
}

//Function to Clear Existing List
var clearListData = function(){
    localStorage.clear();
    $("#previousSearchHistory").empty();
}



//Function to click on existing list to display data again 

var reinserting = function (event){
    event.preventDefault();
    var compare = event.target;
        if (compare.matches("button.list-group-item")) {
            console.log (compare.id)
            searchCityForm.value = JSON.parse(compare.id)
            getCityData()
}}


//Event Listeners and calling Functions 
searchCityButton.addEventListener("click",getCityData);
clearCityButton.addEventListener("click",clearListData);
existingList ();

searchCityForm.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getCityData ()
    }
});
