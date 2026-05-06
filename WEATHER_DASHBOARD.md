# Weather Dashboard - Integration Guide

This document provides complete instructions for integrating the weather dashboard into the Lagoon application.

## 📋 Overview

The weather dashboard includes:
- **Real-time weather data** from OpenWeather API
- **5-day forecast** capabilities
- **Weather widget** for embedding
- **API route** for secure backend calls
- **Temperature unit toggle** (Celsius/Fahrenheit)

## 🔧 Setup Instructions

### Step 1: Get OpenWeather API Key

1. Visit [openweathermap.org](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API keys section
4. Copy your API key

### Step 2: Configure Environment Variables

Add to `.env.local`:

```env
# Weather API Configuration
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### Step 3: Install Required Dependencies

The following are already in `package.json`:
```bash
npm install axios
```

If axios is missing:
```bash
npm install axios
```

## 📁 File Structure

```
lagoon/
├── components/
│   └── WeatherWidget.js          # Reusable weather widget
├── pages/
│   ├── api/
│   │   └── weather.js            # Backend weather API route
│   ├── weather.js                # Main weather dashboard
│   └── weather-forecast.js       # 5-day forecast page
└── .env.example                  # Environment template
```

## 🎯 Available Routes

| Route | Purpose | Features |
|-------|---------|----------|
| `/weather` | Main dashboard | Current weather, detailed stats, search |
| `/weather-forecast` | 5-day forecast | Hourly breakdown, extended forecast |
| `/api/weather` | Backend API | Data fetching, caching |

## 💻 Usage Examples

### Embedding Weather Widget

In any page or component:

```javascript
import WeatherWidget from '@/components/WeatherWidget';

export default function MyPage() {
  return (
    <div>
      <h1>Welcome</h1>
      <WeatherWidget city="New York" />
      <WeatherWidget city="London" />
    </div>
  );
}
```

### API Usage

Fetch weather data from the backend:

```javascript
// Client-side
const response = await fetch('/api/weather?city=Paris&type=current');
const data = await response.json();
console.log(data);
```

### Using with Stacks/Lending Features

Combine weather with blockchain features:

```javascript
import WeatherWidget from '@/components/WeatherWidget';
import LoanForm from '@/components/LoanForm';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <WeatherWidget city="London" />
      <LoanForm /> {/* Your sBTC lending form */}
    </div>
  );
}
```

## 🔐 API Endpoints

### GET `/api/weather`

**Parameters:**
- `city` (required): City name
- `type` (optional): 'current' or 'forecast' (default: 'current')

**Response:**
```json
{
  "name": "London",
  "sys": { "country": "GB" },
  "main": {
    "temp": 15.2,
    "feels_like": 14.8,
    "humidity": 65,
    "pressure": 1013
  },
  "weather": [{
    "main": "Clouds",
    "description": "overcast clouds",
    "icon": "04d"
  }],
  "wind": { "speed": 4.5, "deg": 230 }
}
```

## 🎨 Customization

### Change Widget Colors

Edit `components/WeatherWidget.js`:

```javascript
// Change gradient
<div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white">
  {/* Modify: from-[your-color] to-[your-color] */}
</div>
```

### Custom Weather Icons

Replace weather icon source:

```javascript
const getWeatherIcon = (iconCode) => {
  return `https://your-icon-cdn.com/icons/${iconCode}.png`;
};
```

### Adjust Temperature Units

Default is Celsius. To use Fahrenheit:

```javascript
const [unit, setUnit] = useState('imperial'); // 'metric' for Celsius
```

## 🚀 Deployment

### Vercel Deployment

1. **Add environment variable** in Vercel dashboard:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY = your_key
   ```

2. **Deploy**:
   ```bash
   git push origin main
   ```
   Automatic deployment via GitHub Actions

### Local Testing

```bash
# Start development server
npm run dev

# Navigate to:
# http://localhost:3000/weather
# http://localhost:3000/weather-forecast
```

## 📊 Data Updates

Weather data is fetched fresh on each request. To add caching:

```javascript
// Add to pages/api/weather.js
const cacheTime = 10 * 60 * 1000; // 10 minutes
res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
```

## ⚙️ Configuration Options

### API Rate Limits

OpenWeather free tier: 60 calls/minute

### Timeout Settings

Adjust API timeout in `pages/api/weather.js`:

```javascript
const response = await axios.get(url, {
  params,
  timeout: 5000, // 5 seconds
});
```

## 🐛 Troubleshooting

### Missing API Key Error

**Error**: `API key not configured`

**Solution**:
```bash
# Check .env.local exists
cat .env.local

# Verify key is set
echo $NEXT_PUBLIC_OPENWEATHER_API_KEY
```

### City Not Found

**Error**: `City not found. Please try again.`

**Solution**:
- Check spelling (e.g., "New York" not "NY")
- Use full city names
- API supports ISO 3166 country codes: "London,GB"

### CORS Issues

If frontend API fails, use backend route:

```javascript
// Instead of calling API directly
const response = await fetch('/api/weather?city=London');
```

## 📈 Performance Tips

1. **Use reusable widget** instead of full page for multiple locations
2. **Implement caching** for repeated requests
3. **Lazy load** forecast data
4. **Debounce** search input

```javascript
const [searchTimer, setSearchTimer] = useState(null);

const handleSearch = (value) => {
  clearTimeout(searchTimer);
  setSearchTimer(setTimeout(() => {
    fetchWeather(value);
  }, 500));
};
```

## 📚 Additional Resources

- [OpenWeather API Docs](https://openweathermap.org/api)
- [Weather Icons](https://openweathermap.org/weather-conditions)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Axios Documentation](https://axios-http.com)

## 🔗 Integration with Lagoon

### Weather-Based Lending Conditions

Future enhancement idea:

```javascript
// Adjust loan terms based on weather
if (weather.main.temp < 0) {
  // Winter conditions - lower interest rates
  interestRate = baseRate * 0.8;
} else if (weather.main.humidity > 80) {
  // High humidity - risk adjustment
  collateralRequirement *= 1.1;
}
```

## ✅ Verification Checklist

- [ ] OpenWeather API key obtained
- [ ] `.env.local` configured
- [ ] `npm install` completed
- [ ] Development server runs: `npm run dev`
- [ ] Weather page loads at `/weather`
- [ ] Forecast page loads at `/weather-forecast`
- [ ] Search functionality works
- [ ] Temperature toggle works
- [ ] Deployed to Vercel
- [ ] Environment variable set in Vercel

## 📞 Support

For issues:
1. Check browser console for errors
2. Verify API key in `.env.local`
3. Check OpenWeather API status
4. Review GitHub Issues for similar problems

---

**Last Updated**: May 2026
**Status**: Production Ready
