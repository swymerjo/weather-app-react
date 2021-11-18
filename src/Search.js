import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

export default function Search() {
  const [cityName, setCityName] = useState(null);
  const [weather, setWeather] = useState({});
  const [message, setMessage] = useState(null);

  function displayWeather(response) {
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      image: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "96c6ec35768d7fb6accd0167701b703c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    setMessage(
      <div>
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.image} alt="weather-icon" />
          </li>
        </ul>
      </div>
    );
  }

  function updateCity(event) {
    setCityName(event.target.value);
  }

  return (
    <div>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city..."
          onChange={updateCity}
        />
        <input type="submit" />
      </form>
      <h2>{message}</h2>
    </div>
  );
}
