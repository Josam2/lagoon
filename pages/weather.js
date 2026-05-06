import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherDashboard() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // metric for Celsius, imperial for Fahrenheit

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (cityName = city) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: cityName,
          units: unit,
          appid: API_KEY,
        },
      });
      setWeatherData(response.data);
      setCity(cityName);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please try again.');
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const weatherDescriptions = {
    Clear: '☀️ Clear Sky',
    Clouds: '☁️ Cloudy',
    Rain: '🌧️ Rainy',
    Snow: '❄️ Snowy',
    Thunderstorm: '⛈️ Thunderstorm',
    Drizzle: '🌦️ Drizzle',
    Mist: '🌫️ Mist',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-blue-100">Check weather conditions around the world</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={toggleUnit}
              className="px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              °{unit === 'metric' ? 'C' : 'F'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            <p className="text-white mt-4">Loading weather data...</p>
          </div>
        )}

        {/* Weather Card */}
        {weatherData && !loading && (
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Main Weather Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
              <h2 className="text-3xl font-bold mb-2">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <p className="text-blue-100 mb-6">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              {/* Temperature Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <img
                    src={getWeatherIcon(weatherData.weather[0].icon)}
                    alt={weatherData.weather[0].main}
                    className="w-24 h-24"
                  />
                  <div className="ml-4">
                    <div className="text-6xl font-bold">
                      {Math.round(weatherData.main.temp)}°
                    </div>
                    <p className="text-xl">
                      {weatherDescriptions[weatherData.weather[0].main] ||
                        weatherData.weather[0].main}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-blue-100 capitalize text-lg">
                {weatherData.weather[0].description}
              </p>
            </div>

            {/* Weather Details Grid */}
            <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">Feels Like</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(weatherData.main.feels_like)}°
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">Humidity</p>
                <p className="text-2xl font-bold text-blue-600">
                  {weatherData.main.humidity}%
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">Wind Speed</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(weatherData.wind.speed * 3.6).toFixed(1)} km/h
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">Pressure</p>
                <p className="text-2xl font-bold text-blue-600">
                  {weatherData.main.pressure} mb
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">Visibility</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(weatherData.visibility / 1000).toFixed(1)} km
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">UV Index</p>
                <p className="text-2xl font-bold text-blue-600">
                  {weatherData.clouds.all}%
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">Max Temp</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(weatherData.main.temp_max)}°
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">Min Temp</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(weatherData.main.temp_min)}°
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">Wind Direction</p>
                <p className="text-2xl font-bold text-blue-600">
                  {weatherData.wind.deg}°
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 p-6 border-t">
              <h3 className="font-semibold text-gray-700 mb-4">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Sunrise</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Sunset</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Coordinates</p>
                  <p className="font-semibold text-gray-800">
                    {weatherData.coord.lat.toFixed(2)}°, {weatherData.coord.lon.toFixed(2)}°
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Sea Level</p>
                  <p className="font-semibold text-gray-800">
                    {weatherData.main.sea_level || 'N/A'} mb
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial Message */}
        {!weatherData && !loading && !error && (
          <div className="text-center text-white">
            <p className="text-lg">Enter a city name to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
