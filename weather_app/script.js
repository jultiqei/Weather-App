const apiKey = "2664b00188af01ff139a10739ec10f13";
const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityName = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

document.querySelector(".error").style.display = "none";
document.querySelector(".weather").style.display = "none";

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else if (cityName.value == "") { 
        document.querySelector(".error").style.display = "block"; 
        document.querySelector(".weather").style.display = "none"; 
    } else {
        var data = await response.json();

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "assets/cloudy.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "assets/rainy.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "assets/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "assets/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "assets/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "assets/snowy.png";
        }
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityName.value);
});

cityName.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather(cityName.value);
    }
});
