document.addEventListener('DOMContentLoaded', function() {
    const cityName = document.getElementById("cityName");
    const currentTemp = document.getElementById("currentTemp");
    const currentCondition = document.getElementById("currentCondition");
    const body = document.body;

    // The right thing to do would be to hide these API keys by
    // making a server that gets the information and having the client
    // call that server instead. I'm not concerned about people using
    // these keys as this is just a tiny little website, 
    // but I think it should be addressed because this is stupidly bad practice.
    
    let apiKey = 'a24e8f41fa7945988977c199a1c8b356';
    $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
        if (!data.hasOwnProperty("success")) {
            var lat = data.latitude;
            var long = data.longitude;
            cityName.innerHTML = data.city;
            cityName.style.opacity = 1;
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=62d2fe6f2a615c2899f6e29b3b004e87&units=imperial`
            $.getJSON(weatherURL, function(tempData) {
                console.log(JSON.stringify(tempData))
                currentTemp.innerHTML = `Actual: ${tempData.main.temp | 0}° F | Feels Like: ${tempData.main.feels_like | 0}° F`;
                currentTemp.style.opacity = 1;
                currentCondition.innerHTML = titleCase(tempData.weather[0].description);
                currentCondition.style.opacity = 1;
            });
        } else {
            currentTemp.style.opacity = 0
            currentCondition.style.opacity = 0
            cityName.innerHTML = "Error Finding Location!"
        }
    });
});

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }