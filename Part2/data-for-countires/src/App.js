import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState([]);
  const [detailToShow, setDetailToshow] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const getMatch = (arr, str) => {
    let reg = new RegExp(str, "i");
    return arr.filter((item) => item.name.common.match(reg));
  };

  const countryToShow =
    searchCountry === "" ? countries : getMatch(countries, searchCountry);
  if (detailToShow) {
    const country = countries.find((country) => country.ccn3 === detailToShow);
    return (
      <>
        <Country country={country} />
        <button onClick={() => setDetailToshow("")}>Back</button>
      </>
    );
  }

  return (
    <>
      <div>
        Find countries
        <input
          onChange={(e) => setSearchCountry(e.target.value)}
          value={searchCountry}
        />
      </div>
      {countryToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : countryToShow.length === 1 ? (
        <div>
          {countryToShow.map((country, index) => (
            <div key={index}>
              <Country country={country} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {countryToShow.map((country, index) => (
            <div key={index}>
              {country.name.common}
              <button onClick={() => setDetailToshow(country.ccn3)}>
                Show
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
