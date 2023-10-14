// Fetch data from API (airvisual.com)
async function getCityDatas() {
  // DOM elements
  let moodIcon = document.getElementById("mood-icon");
  let citySituation = document.getElementById("city-situation");
  let pollutionStatus = document.getElementById("pollution-status");
  let airQualityIndex = document.getElementById("air-quality-index");
  let temperatureStatus = document.getElementById("temperature-status");
  let humidityStatus = document.getElementById("humidity-status");
  let windSpeedStatus = document.getElementById("wind-speed-status");

  try {
    const response = await fetch(
      "https://api.airvisual.com/v2/nearest_city?key=76fa60d1-6fdc-4ef9-9a0c-9dfa19eb9531"
    );
    const responseData = await response.json();

    const cityData = {
      city: responseData.data.city,
      pollution: responseData.data.current.pollution.aqius,
      temperature: responseData.data.current.weather.tp,
      humidity: responseData.data.current.weather.hu,
      windSpeed: responseData.data.current.weather.ws,
    };
    console.log(cityData);
    // Display data on the DOM
    citySituation.textContent = `Voici la situation à ${cityData.city}`;
    airQualityIndex.textContent = cityData.pollution;
    temperatureStatus.textContent = `${cityData.temperature}°C`;
    humidityStatus.textContent = `${cityData.humidity}%`;
    windSpeedStatus.textContent = `${cityData.windSpeed}m/s`;

    switch (true) {
      case cityData.pollution >= 0 && cityData.pollution <= 50:
        pollutionStatus.textContent = "Bon";
        moodIcon.src = "./ressources/happy.svg";
        moodIcon.alt = "happy smiley icon";
        break;
      case cityData.pollution >= 51 && cityData.pollution < 100:
        pollutionStatus.textContent = "Moyen";
        moodIcon.src = "./ressources/thinking.svg";
        moodIcon.alt = "thinking smiley icon";
        break;
      case cityData.pollution >= 101 && cityData.pollution <= 150:
        pollutionStatus.textContent = "Mauvais";
        moodIcon.src = "./ressources/bad.svg";
        moodIcon.alt = "bad smiley icon";
        break;
      case cityData.pollution >= 151 && cityData.pollution <= 200:
        pollutionStatus.textContent = "Dangereux";
        moodIcon.src = "./ressources/unhealthy.svg";
        moodIcon.alt = "unhealthy smiley icon";
        break;
      case cityData.pollution >= 201 && cityData.pollution <= 300:
        pollutionStatus.textContent = "Trés dangereux";
        moodIcon.src = "./ressources/terrible.svg";
        moodIcon.alt = "terrible smiley icon";
        break;
      case cityData.pollution >= 301 && cityData.pollution <= 500:
        pollutionStatus.textContent = "Extremmement dangereux";
        moodIcon.src = "./ressources/masked.svg";
        moodIcon.alt = "masked smiley icon";
      default:
        pollutionStatus.textContent = "Pas de données";
        moodIcon.src = "./ressources/magnifying-glass.svg";
        moodIcon.alt = "magnifying glass icon";
    }
  } catch (error) {
    console.error(error);
  }
}

//getCityDatas();
