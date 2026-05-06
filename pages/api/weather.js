import axios from 'axios';

export default async function handler(req, res) {
  const { city, type = 'current' } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  if (!process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    let url;
    const params = {
      q: city,
      units: 'metric',
      appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
    };

    if (type === 'forecast') {
      url = 'https://api.openweathermap.org/data/2.5/forecast';
    } else {
      url = 'https://api.openweathermap.org/data/2.5/weather';
    }

    const response = await axios.get(url, { params });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch weather data',
    });
  }
}
