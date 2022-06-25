import { useEffect, useState } from "react";
import axios from "axios";
const Country = ({ country }) => {
  const [capWeather, setCapWeather] = useState();
  useEffect(() => {
    if (country) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
      axios.get(url).then((response) => {
        setCapWeather(response.data);
      });
    }
  }, [country]);
  return (
    <>
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h4>Languages</h4>
        <ul>
          {Object.values(country.languages).map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags[0]} alt="flag" width="50px" />
        <h3>Weather in {country.capital}</h3>
        {capWeather && (
          <div>
            <p>Temperature {capWeather.main.temp} celcius</p>
            <img
              src={`https://openweathermap.org/img/wn/${capWeather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p>Wind {capWeather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Country;
