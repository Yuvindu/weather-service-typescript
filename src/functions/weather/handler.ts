import axios from "axios";
 
const API_KEY = "c802af44bb1ca4611d2a9fafecd7111b";
// const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
 
interface WeatherResponse {
  main: { temp: number; humidity: number };
  weather: { description: string }[];
}
 
interface WeatherError {
  message: string;
}
 
export const main = async (event: any) => {
  const cityName = event.queryStringParameters?.city;
  if (!cityName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "City name is required" }),
    };
  }
 
  try {
    const response = await axios.get<WeatherResponse>(
      `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const { temp, humidity } = response.data.main;
    const description = response.data.weather[0].description;
 
    return {
      statusCode: 200,
      body: JSON.stringify({
        city: cityName,
        temperature: temp,
        humidity,
        description,
      }),
    };
  } catch (error: any) {
    const errorMessage =
      (error.response?.data as WeatherError)?.message ||
      "An error occurred while fetching the weather data.";
    return { statusCode: 500, body: JSON.stringify({ message: errorMessage }) };
  }
};