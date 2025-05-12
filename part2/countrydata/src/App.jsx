import { useEffect } from "react";
import { useState } from "react";
import countryService from "./services/countrys";
import Country from "./components/Country";
import Weather from "./components/Weather";

function App() {
  const [countrys, setCountrys] = useState([]);
  const [newCountry, setNewCountry] = useState({});
  const [countrysToShow, setCountrysToShow] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [showCountry, setShowCountry] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    countryService.getAll().then((allCountrys) => {
      setCountrys(allCountrys);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setShowCountry("");

    const filtered = countrys
      .map((country) => country.name.common)
      .filter((name) => name.toLowerCase().includes(event.target.value.toLowerCase()));

    setCountrysToShow(filtered);

    if (countrysToShow.length === 1) {
      selectCountry(countrysToShow[0]);
    }
  };

  const selectCountry = (name) => {
    countryService.getCountry(name).then((returnedCountry) => {
      setNewCountry(returnedCountry);
      fetchWeather(returnedCountry.latlng[0], returnedCountry.latlng[1]);
    });
  };

  const revealCountry = (country) => {
    if (showCountry === country) {
      setShowCountry("");
    } else {
      setShowCountry(country);
      selectCountry(country);
    }
  };

  const fetchWeather = (lat, lon) => {
    countryService.getWeather(lat, lon).then((returnedWeather) => {
      setWeather([
        returnedWeather.current.temp,
        returnedWeather.current.wind_speed,
        returnedWeather.current.weather[0].icon,
      ]);
    });
  };

  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange} />
      <div>
        {countrysToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countrysToShow.length === 1 ? (
          <div>
            <Country
              name={countrysToShow}
              capital={newCountry.capital}
              area={newCountry.area}
              languages={newCountry.languages}
              flags={newCountry.flags}
            />
            <Weather
              capital={newCountry.capital}
              temp={weather[0]}
              wind={weather[1]}
              icon={weather[2]}
            />
          </div>
        ) : (
          countrysToShow.map((country) => (
            <div key={country}>
              {country} <button onClick={() => revealCountry(country)}>show</button>
            </div>
          ))
        )}
      </div>
      <div>
        {showCountry && (
          <div>
            <Country
              name={showCountry}
              capital={newCountry.capital}
              area={newCountry.area}
              languages={newCountry.languages}
              flags={newCountry.flags}
            />
            <Weather
              capital={newCountry.capital}
              temp={weather[0]}
              wind={weather[1]}
              icon={weather[2]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
