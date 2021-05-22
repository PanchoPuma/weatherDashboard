// variables
var APIkey = "b1d0aae8e0d8743f9981d6a87d77d2bb";
var city = "Quito"
var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&exclude=daily&appid="+ APIkey

fetch (openWeatherAPI).then(function(response) {
    if (response.ok) {
        response.json().then(function (details){
            console.log (details)// all details
            console.log (details.name)// name of the city 
            console.log (details.main.temp) //current temperature
            console.log (details.main.humidity) //current Humidity
            console.log (details.wind.speed) //current Wind Speed
        })
    }
})
