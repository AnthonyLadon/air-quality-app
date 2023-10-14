// Fetch data from API (airvisual.com)
async function getCityDatas() {
  // DOM elements
  let background = document.getElementById("background-layer");
  let moodIcon = document.getElementById("mood-icon");
  let citySituation = document.getElementById("city-situation");
  let pollutionStatus = document.getElementById("pollution-status");
  let airQualityIndex = document.getElementById("air-quality-index");
  let temperatureStatus = document.getElementById("temperature-status");
  let humidityStatus = document.getElementById("humidity-status");
  let windSpeedStatus = document.getElementById("wind-speed-status");
  let cursor = document.getElementById("pollution-cursor");
  let loader = document.getElementById("loader");

  try {
    const response = await fetch(
      "https://api.airvisual.com/v2/nearest_city?key=76fa60d1-6fdc-4ef9-9a0c-9dfa19eb9531"
    );
    const responseData = await response.json();

    loader.classList.remove("active");

    const cityData = {
      city: responseData.data.city,
      pollution: responseData.data.current.pollution.aqius,
      temperature: responseData.data.current.weather.tp,
      humidity: responseData.data.current.weather.hu,
      windSpeed: responseData.data.current.weather.ws,
    };
    console.log(cityData);
    // Display data on the DOM
    citySituation.textContent = `Voici la qualité de l'air à ${cityData.city}`;
    airQualityIndex.textContent = cityData.pollution;
    temperatureStatus.textContent = `${cityData.temperature}°C`;
    humidityStatus.textContent = `${cityData.humidity}%`;
    windSpeedStatus.textContent = `${cityData.windSpeed}m/s`;

    switch (true) {
      case cityData.pollution >= 0 && cityData.pollution <= 50:
        pollutionStatus.textContent = "Bon";
        moodIcon.src = "./ressources/happy.svg";
        moodIcon.alt = "happy smiley icon";
        cursor.style.left = "0%";
        background.style.backgroundColor = "#00ff007a";
        break;
      case cityData.pollution >= 51 && cityData.pollution < 100:
        pollutionStatus.textContent = "Moyen";
        moodIcon.src = "./ressources/thinking.svg";
        moodIcon.alt = "thinking smiley icon";
        cursor.style.left = "15%";
        background.style.backgroundColor = "#ffff007a";
        break;
      case cityData.pollution >= 101 && cityData.pollution <= 150:
        pollutionStatus.textContent = "Mauvais";
        moodIcon.src = "./ressources/bad.svg";
        moodIcon.alt = "bad smiley icon";
        cursor.style.left = "25%";
        background.style.backgroundColor = "#ff7f007a";
        break;
      case cityData.pollution >= 151 && cityData.pollution <= 200:
        pollutionStatus.textContent = "Dangereux";
        moodIcon.src = "./ressources/unhealthy.svg";
        moodIcon.alt = "unhealthy smiley icon";
        cursor.style.left = "35%";
        background.style.backgroundColor = "#ff00007a";
        break;
      case cityData.pollution >= 201 && cityData.pollution <= 300:
        pollutionStatus.textContent = "Trés dangereux";
        moodIcon.src = "./ressources/terrible.svg";
        moodIcon.alt = "terrible smiley icon";
        cursor.style.left = "50%";
        background.style.backgroundColor = "#8b00ff7a";
        break;
      case cityData.pollution >= 301 && cityData.pollution <= 500:
        pollutionStatus.textContent = "Extremmement dangereux";
        moodIcon.src = "./ressources/masked.svg";
        moodIcon.alt = "masked smiley icon";
        cursor.style.left = "80%";
        background.style.backgroundColor = "#7e00237a";
      default:
        pollutionStatus.textContent = "Pas de données";
        moodIcon.src = "./ressources/magnifying-glass.svg";
        moodIcon.alt = "magnifying glass icon";
    }
  } catch (error) {
    loader.classList.remove("active");
    moodIcon.src = "./ressources/browser.svg";
    moodIcon.alt = "error icon";
    citySituation.style.color = "red";
    citySituation.textContent = error.message;
  }
}

getCityDatas();
