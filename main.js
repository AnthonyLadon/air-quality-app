async function getCityDatas() {
  try {
    const response = await fetch(
      "https://api.airvisual.com/v2/nearest_city?key=76fa60d1-6fdc-4ef9-9a0c-9dfa19eb9531"
    );
    const responseData = await response.json();
    console.log(responseData);

    const cityData = {
      city: responseData.data.city,
      pollution: responseData.data.current.pollution.aqius,
      temperature: responseData.data.current.weather.tp,
      humidity: responseData.data.current.weather.hu,
      windSpeed: responseData.data.current.weather.ws,
    };
    console.log(cityData);

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

getCityDatas();
