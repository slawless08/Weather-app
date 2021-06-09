var cityName = document.querySelector(".city");
var enterBtn = document.querySelector(".search-btn");

// Run function when search button is clicked
$(".search-btn").on("click", function(event){
    event.preventDefault();
    console.log("This was clicked");
})

/* the lines below was to see if I could add an event listener for the enter key after texted was entered into the search box. Does not work :( 


$(".city").on('keydown', function(event){
    if(event.KeyCode === 13){
        event.preventDefault();
        console.log("Enter was pressed!!! ")
    }
})

*/

// Api request
function getForecast(){
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&appid=58a342ef9741e8a83c016a984c0c2b3c"
    var cityName = "Columbus";

    fetch(requestUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        })
}

// getForecast();