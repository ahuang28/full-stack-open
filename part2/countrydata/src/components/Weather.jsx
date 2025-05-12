const Weather = ({ capital, temp, wind, icon }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default Weather;
