import React, { useEffect, useState } from "react";
import { MapPin, ThermometerSun, CloudSun } from "lucide-react";
import "../css/weather.css";

function WeatherInfo() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Colombo");
  const [search, setSearch] = useState("");

  const API_KEY = "b18882f94357f60cc67e774cd39ec5b3";

  const fetchData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    fetchData(city);
    const interval = setInterval(() => {
      fetchData(city);
    }, 600000);
    return () => clearInterval(interval);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setCity(search);
      setSearch("");
    }
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">
        <MapPin style={{"width":"33px", "height":"50px"}} /> Weather in {city}
      </h2>

      <form onSubmit={handleSearch} className="weather-search">
        <input
          type="text"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {weather ? (
        <div className="weather-details">
          <p className="weather-temp">
            <ThermometerSun style={{"width":"33px", "height":"50px"}}  /> {weather.main.temp} °C
          </p>
          <hr />
          <p className="weather-condition">
            <CloudSun style={{"width":"23px", "height":"35px", "margin-bottom":"5px"}}/> {weather.weather[0].description}
          </p>
        </div>
      ) : (
        <p className="loading">Loading weather...</p>
      )}
    </div>
  );
}

export default WeatherInfo;
