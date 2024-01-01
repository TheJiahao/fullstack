import { useEffect, useState } from "react";
import Weather from "../interfaces/Weather";
import axios from "axios";

const WeatherInfo = ({ city }: { city: string }) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      )
      .then((response) => {
        const currentWeather: Weather = response.data.current;
        console.log("weather from API", currentWeather);

        setWeather(currentWeather);
        console.log("set weather", currentWeather);
      });
  });

  if (!weather) {
    return;
  }

  return (
    <div>
      <p>temperature {weather.temp_c.toPrecision(3)} Celcius</p>

      <img src={weather.condition.icon} alt="weather icon" />

      <p>wind {(weather.wind_kph / 3.6).toPrecision(3)} m/s</p>
    </div>
  );
};

export default WeatherInfo;
