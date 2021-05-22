// variables
var APIkey = "b1d0aae8e0d8743f9981d6a87d77d2bb";
var lat = "-0.22985"
var lon = "78.52495"
var openWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&exclude=daily&appid="+ APIkey

fetch (openWeatherAPI).then(function(response) {
    if (response.ok) {
        response.json().then(function (details){
            console.log (details)// all details
            console.log (details.current.temp) //current temperature
            console.log (details.current.humidity) //current Humidity
            console.log (details.current.wind_speed) //current Wind Speed
            console.log (details.current.uvi) //current UV index
        })
    }
})


// original API link 
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
