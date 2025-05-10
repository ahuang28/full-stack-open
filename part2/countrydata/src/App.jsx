import { useEffect } from "react";
import { useState } from "react";
import countryService from "./services/countrys";
import Country from "./components/Country";

function App() {
  const [countrys, setCountrys] = useState([]);
  const [newCountry, setNewCountry] = useState({});
  const [countrysToShow, setCountrysToShow] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    countryService.getAll().then((allCountrys) => {
      setCountrys(allCountrys);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);

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
    });
  };

  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange} />
      <div>
        {countrysToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countrysToShow.length === 1 ? (
          <Country
            name={countrysToShow}
            capital={newCountry.capital}
            area={newCountry.area}
            languages={newCountry.languages}
            flags={newCountry.flags}
          />
        ) : (
          countrysToShow.map((country) => <div key={country}>{country}</div>)
        )}
      </div>
    </div>
  );
}

export default App;
