// variables
var APIkey = "b1d0aae8e0d8743f9981d6a87d77d2bb";
var lat = "-0.22985"
var lon = "78.52495"
var frequency = "daily"
var openWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude="+frequency+"&appid="+ APIkey

fetch (openWeatherAPI).then(function(response) {
    if (response.ok) {
        response.json().then(function (details){
            console.log (details)
        })
    }
})


// original API link 
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
