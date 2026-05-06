# 📡 API Documentation

Complete API reference for Lagoon application endpoints.

## Base URLs

- **Development**: `http://localhost:3000`
- **Production**: `https://lagoon-app.vercel.app`

---

## Weather API

### Get Current Weather

Returns current weather data for a specified city.

```
GET /api/weather?city=London&type=current
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `city` | string | Yes | City name (e.g., "London", "New York") |
| `type` | string | No | Data type: "current" or "forecast" (default: "current") |

**Response (200 OK):**

```json
{
  "name": "London",
  "sys": {
    "country": "GB",
    "sunrise": 1615123200,
    "sunset": 1615170000
  },
  "main": {
    "temp": 15.2,
    "feels_like": 14.8,
    "humidity": 65,
    "pressure": 1013,
    "temp_min": 12.5,
    "temp_max": 17.8,
    "sea_level": 1013
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    }
  ],
  "wind": {
    "speed": 4.5,
    "deg": 230
  },
  "clouds": {
    "all": 40
  },
  "visibility": 10000,
  "coord": {
    "lon": -0.1276,
    "lat": 51.5085
  }
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing city parameter
{
  "error": "City parameter is required"
}

// 404 Not Found - City doesn't exist
{
  "error": "city not found"
}

// 500 Server Error - API key misconfigured
{
  "error": "API key not configured"
}
```

**Example Requests:**

```bash
# Current weather for London
curl "http://localhost:3000/api/weather?city=London"

# 5-day forecast
curl "http://localhost:3000/api/weather?city=Paris&type=forecast"

# With special characters
curl "http://localhost:3000/api/weather?city=New%20York"
```

**JavaScript Example:**

```javascript
async function getWeather(city) {
  try {
    const response = await fetch(`/api/weather?city=${city}`);
    if (!response.ok) throw new Error('Weather fetch failed');
    const data = await response.json();
    console.log(`Temperature in ${data.name}: ${data.main.temp}°C`);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

getWeather('London');
```

---

## Frontend Routes

### Weather Dashboard

```
GET /weather
```

Interactive weather dashboard with search and details.

**Features:**
- Real-time weather search
- Temperature unit toggle (°C/°F)
- Current conditions display
- Detailed weather metrics
- Sunrise/sunset times

### Weather Forecast

```
GET /weather-forecast
```

5-day weather forecast with hourly breakdown.

**Features:**
- 5-day extended forecast
- Hourly weather data
- Rain probability
- Cloud coverage
- Wind speed

---

## Request/Response Examples

### Successful Weather Request

**Request:**
```bash
GET /api/weather?city=Tokyo&type=current
Authorization: None required (public endpoint)
```

**Response:**
```json
{
  "name": "Tokyo",
  "sys": {
    "country": "JP"
  },
  "main": {
    "temp": 18.5,
    "feels_like": 17.9,
    "humidity": 55,
    "pressure": 1015
  },
  "weather": [
    {
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "wind": {
    "speed": 3.2,
    "deg": 180
  }
}
```

### Forecast Request

**Request:**
```bash
GET /api/weather?city=London&type=forecast
```

**Response:**
```json
{
  "list": [
    {
      "dt": 1620000000,
      "main": {
        "temp": 14.5,
        "feels_like": 13.8,
        "humidity": 70
      },
      "weather": [
        {
          "main": "Rainy",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 80
      },
      "pop": 0.6,
      "wind": {
        "speed": 5.5,
        "deg": 220
      }
    }
    // ... more items
  ]
}
```

---

## Weather Icons

Weather condition icons from OpenWeatherMap:

| Code | Condition | Icon |
|------|-----------|------|
| 01d | Clear sky (day) | ☀️ |
| 01n | Clear sky (night) | 🌙 |
| 02d | Few clouds (day) | ⛅ |
| 02n | Few clouds (night) | 🌥️ |
| 03d | Scattered clouds | ☁️ |
| 04d | Broken clouds | ☁️ |
| 09d | Shower rain | 🌧️ |
| 10d | Rain (day) | 🌧️ |
| 11d | Thunderstorm | ⛈️ |
| 13d | Snow | ❄️ |
| 50d | Mist | 🌫️ |

---

## Rate Limiting

OpenWeatherMap API limits (Free Tier):

- **Rate Limit**: 60 calls/minute
- **Daily Limit**: 1,000 calls/day
- **Response Time**: <1 second typical

---

## Error Handling

### Common HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | Weather data returned |
| 400 | Bad Request | Missing required parameter |
| 404 | Not Found | City doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | API misconfiguration |

### Error Response Format

```json
{
  "error": "Human-readable error message"
}
```

---

## Best Practices

### Caching

Implement client-side caching to reduce API calls:

```javascript
const weatherCache = {};
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

async function getCachedWeather(city) {
  const cached = weatherCache[city];
  if (cached && Date.now() - cached.time < CACHE_TIME) {
    return cached.data;
  }
  
  const data = await fetch(`/api/weather?city=${city}`).then(r => r.json());
  weatherCache[city] = { data, time: Date.now() };
  return data;
}
```

### Error Handling

Always handle API errors gracefully:

```javascript
async function getWeatherSafely(city) {
  try {
    const response = await fetch(`/api/weather?city=${city}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Weather API error:', error);
    return null; // Or default fallback data
  }
}
```

### Request Debouncing

Debounce search input to reduce API calls:

```javascript
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const debouncedSearch = debounce(searchWeather, 500);
```

---

## Integration Examples

### React Component

```javascript
import { useState, useEffect } from 'react';

export default function WeatherDisplay({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`/api/weather?city=${city}`)
      .then(r => r.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [city]);
  
  if (loading) return <div>Loading...</div>;
  if (!weather) return <div>No data</div>;
  
  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
}
```

### Using Axios

```javascript
import axios from 'axios';

const weatherAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  timeout: 5000,
});

export async function fetchWeather(city) {
  return weatherAPI.get('/api/weather', { params: { city } });
}
```

---

## Troubleshooting

### "API key not configured"

**Solution**: Add `NEXT_PUBLIC_OPENWEATHER_API_KEY` to `.env.local`

### "City not found"

**Solution**: Check spelling and try with full city name

### Rate limit exceeded

**Solution**: Implement caching to reduce API calls

### No data returned

**Solution**: Verify network connectivity and API status

---

## Support

For API issues:
1. Check [OpenWeather Status](https://status.openweathermap.org)
2. Review [API Documentation](https://openweathermap.org/api)
3. Check application logs
4. Review GitHub Issues

---

**Last Updated**: May 2026
**API Version**: 2.5
**Status**: Production Ready
