document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("input-box");
    const infoBtn = document.getElementById("button");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const showError = document.getElementById("error-message");

    const API_KEY = "fa6e96a6588d0699fef90ec774ff1571";

    infoBtn.addEventListener("click", async () => {
        const city = inputBox.value.trim();
        if (!city) return;

        //It may throw an error
        //Server/Data is always in another continent
        try {
            let weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showErrorMessage();
        }
    });

    async function fetchWeatherData(city) {
        //get the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        //display the data
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperature.textContent = `Temperature : ${main.temp}°C `;
        description.textContent = `Weather : ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        showError.classList.add("hidden");
    }

    function showErrorMessage() {
        weatherInfo.classList.add("hidden");
        showError.classList.remove("hidden");
    }
    
});