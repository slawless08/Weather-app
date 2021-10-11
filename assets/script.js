var cityName = document.querySelector(".city");
var enterBtn = document.querySelector("#search-btn");
var displaysResults = document.querySelector("#results");
var searchHistory = [];
var historyDiv = document.querySelector("#search-container");

// Run function when search button is clicked
$(".search-btn").on("click", function (event) {
    event.preventDefault();
    let city = cityName.value;
    getForecast(city);
});

// Display search history
function displayHistory () {
    let history = localStorage.getItem("history");
    console.log(history.length);
    // for (var i = 0; i < history.length; i++){
    //     let createP = document.createElement("p");
    //     let currentLoop = history[i];
    //     historyDiv.appendChild(createP);
    //     createP.setAttribute("id", `${currentLoop}`);
    //     document.querySelector(`#${currentLoop}`).textContent = `${currentLoop}`
    // }
}

// need city name, date, temp, humidity, wind speed, and UV index for 5 days
async function getForecast(city) {
    var cityName = city;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",US&units=imperial&appid=5c1763856a423122de5b32ec2407c6b1"



    await fetch(requestUrl)
        .then(function (response) {
            var weatherData = response.json();
            return weatherData
        })
        .then(function (data) {
            console.log(data);
            displayForecast(data);
            searchHistory.splice(0, 0, `${cityName}`);
            localStorage.setItem('history', searchHistory);
            displayHistory();

        })
}

function displayForecast(weatherData) {
    let forecastData = {
        cityName: weatherData.name,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        temp: weatherData.main.temp,
        windSpeed: weatherData.wind.speed,
    }

    function elementCreate(data) {
        let createP = document.createElement("p");
        createP.setAttribute("id", `${data}`);
        displaysResults.appendChild(createP);
    }

    elementCreate("City");
    elementCreate("Temp");
    elementCreate("feels-like");
    elementCreate("humidity");
    elementCreate("wind-speed");

    document.querySelector("#City").textContent = `City: ${forecastData.cityName}`;
    document.querySelector("#Temp").textContent = `Temperature: ${forecastData.temp}`;
    document.querySelector("#feels-like").textContent = `Feels like: ${forecastData.feelsLike}`;
    document.querySelector("#humidity").textContent = `Humidity: ${forecastData.humidity}`;
    document.querySelector("#wind-speed").textContent = `Wind Speed in mph: ${forecastData.windSpeed}`;


};

if(localStorage.getItem("history") != null){
    displayHistory();
}
