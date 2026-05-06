import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherWidget({ city = 'London', unit = 'metric' }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('/api/weather', {
          params: { city, type: 'current' },
        });
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load weather');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, unit]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{weather.name}</h3>
          <p className="text-blue-100 text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <img
          src={getWeatherIcon(weather.weather[0].icon)}
          alt={weather.weather[0].main}
          className="w-16 h-16"
        />
      </div>

      <div className="flex items-baseline mb-4">
        <span className="text-4xl font-bold">{Math.round(weather.main.temp)}°</span>
        <span className="text-blue-100 ml-2">{unit === 'metric' ? 'C' : 'F'}</span>
      </div>

      <p className="text-blue-100 capitalize mb-4">{weather.weather[0].description}</p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-blue-500 bg-opacity-50 rounded p-2">
          <p className="text-blue-100">Humidity</p>
          <p className="font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="bg-blue-500 bg-opacity-50 rounded p-2">
          <p className="text-blue-100">Wind</p>
          <p className="font-semibold">{Math.round(weather.wind.speed)} m/s</p>
        </div>
        <div className="bg-blue-500 bg-opacity-50 rounded p-2">
          <p className="text-blue-100">Feels Like</p>
          <p className="font-semibold">{Math.round(weather.main.feels_like)}°</p>
        </div>
        <div className="bg-blue-500 bg-opacity-50 rounded p-2">
          <p className="text-blue-100">Pressure</p>
          <p className="font-semibold">{weather.main.pressure} mb</p>
        </div>
      </div>
    </div>
  );
}
