import axios from 'axios';

const API_KEY = 'ebee86ef4ada827f7386c55848aae647';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherDetails = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getHourlyForecast = async (city: string) => {
  try {
    const sanitizedCity = city.trim();
    console.log(`Fetching hourly forecast for: ${sanitizedCity}`);

    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: sanitizedCity,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
};