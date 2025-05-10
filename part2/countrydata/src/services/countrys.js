import axios from "axios";
const singleCountryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";
const allCountrysUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(allCountrysUrl);
  return request.then((response) => response.data);
};

const getCountry = (name) => {
  const request = axios.get(`${singleCountryUrl}/${name}`);
  return request.then((response) => response.data);
};

export default { getAll, getCountry };
