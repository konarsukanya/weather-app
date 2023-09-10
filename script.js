let weather = {
  apiKey: "8d7247f9fcc8b6706451d1017954b480",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data ;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
   
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
  
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("chennai");


const unitToggle = document.getElementById('unitToggle');

unitToggle.addEventListener('change', () => {
    const temperatureElement = document.querySelector(".temp"); 
    const temperatureValue = parseFloat(temperatureElement.textContent);

    if (unitToggle.checked) {
        // Convert to Fahrenheit
        const fahrenheitTemperature = (temperatureValue * 9/5) + 32;
        temperatureElement.textContent = `${Math.round(fahrenheitTemperature)}°F`;
    } else {
        // Convert back to Celsius
        const celsiusTemperature = (temperatureValue - 32) * 5/9;
        temperatureElement.textContent = `${Math.round(celsiusTemperature)}°C`;
    }
});
