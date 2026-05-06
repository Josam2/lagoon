import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherForecast() {
  const [city, setCity] = useState('London');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  const fetchForecast = async (cityName = city) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(FORECAST_URL, {
        params: {
          q: cityName,
          units: unit,
          appid: API_KEY,
        },
      });
      setForecast(response.data);
      setCity(cityName);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please try again.');
      } else {
        setError('Failed to fetch forecast data.');
      }
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchForecast();
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const groupForecastByDay = (list) => {
    const grouped = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">5-Day Weather Forecast</h1>
          <p className="text-indigo-100">Detailed forecasts for the next 5 days</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={toggleUnit}
              className="px-4 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
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
            <p className="text-white mt-4">Loading forecast data...</p>
          </div>
        )}

        {/* Forecast List */}
        {forecast && !loading && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Forecast for {forecast.city.name}, {forecast.city.country}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {forecast.list.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4">
                    <p className="font-semibold">
                      {new Date(item.dt * 1000).toLocaleString()}
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-4xl font-bold text-gray-800">
                          {Math.round(item.main.temp)}°
                        </p>
                        <p className="text-gray-600 capitalize">
                          {item.weather[0].description}
                        </p>
                      </div>
                      <img
                        src={getWeatherIcon(item.weather[0].icon)}
                        alt={item.weather[0].main}
                        className="w-20 h-20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Feels Like</p>
                        <p className="font-semibold text-gray-800">
                          {Math.round(item.main.feels_like)}°
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Humidity</p>
                        <p className="font-semibold text-gray-800">{item.main.humidity}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Wind</p>
                        <p className="font-semibold text-gray-800">
                          {(item.wind.speed * 3.6).toFixed(1)} km/h
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Pressure</p>
                        <p className="font-semibold text-gray-800">{item.main.pressure} mb</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cloudiness</p>
                        <p className="font-semibold text-gray-800">{item.clouds.all}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rain Chance</p>
                        <p className="font-semibold text-gray-800">
                          {(item.pop * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Initial Message */}
        {!forecast && !loading && !error && (
          <div className="text-center text-white">
            <p className="text-lg">Enter a city name to view the 5-day forecast</p>
          </div>
        )}
      </div>
    </div>
  );
}
