var apiKey = "d1e2d0763204896fd894698f5c6e27ee"
var today = moment().format('L');
var searchHistoryList = [];
// function for the current weather condition
function currentCondition(city) {
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';

    $.ajax({
        url: queryURL
        method: "GET"
    }).then(function(cityWeatherResponse) {
        console.log(cityWeatherResponse);

        $("#weatherContent").css("display", "block");
        $("#cityDetail").empty();

        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    }
}