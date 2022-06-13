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
    
        //citys searched date and weather icons that represent the conditions
        var currentCity = $(`
        <h2 id="currentCity">
        ${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
        </h2>
        <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
        <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
        <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
`);
    $("#cityDetail").append(currentCity);
    //UV index
    var lat = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var uviQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: uviQueryURL,
            method: "GET"
        }).then(function(uviResponse) {
            console.log(uviResponse);

            var uvIndex = uviResponse.value;
            var uvIndexP = $(`
                <p>UV Index: 
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
                </p>
            `);

            $("#cityDetail").append(uvIndexP);

            futureCondition(lat, lon);
    }
}
