import axios from "axios";
const singleCountryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";
const allCountrysUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weather_api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getAll = () => {
  const request = axios.get(allCountrysUrl);
  return request.then((response) => response.data);
};

const getCountry = (name) => {
  const request = axios.get(`${singleCountryUrl}/${name}`);
  return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${weather_api_key}`
  );
  return request.then((response) => response.data);
};

export default { getAll, getCountry, getWeather };
