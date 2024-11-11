import axios from "axios";
import { APIGatewayProxyEvent } from 'aws-lambda';
import { City } from "src/entities/city.entity";
import { getDatabaseConnection } from "@libs/database-manager";
import { successResponse, clientErrorResponse, handleError } from "@libs/responseUtils"; 

const API_KEY = "c802af44bb1ca4611d2a9fafecd7111b";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: { description: string }[];
}

export const main = async (event: APIGatewayProxyEvent) => {
  const cityName = event.queryStringParameters?.city;
  if (!cityName) {
    return clientErrorResponse({ message: "City name is required" });
  }

  try {
    const cityRepository = (await getDatabaseConnection()).getRepository(City);
    const existingCity = await cityRepository.findOne({ where: { cityName } });

    if (existingCity) {
      return successResponse({
        city: existingCity.cityName,
        temperature: existingCity.temperature,
        humidity: existingCity.humidity,
        description: existingCity.description,
        pressure: existingCity.pressure,
        windSpeed: existingCity.windSpeed,
        windDirection: existingCity.windDirection,
      });
    }

    const response = await axios.get<WeatherResponse>(
      `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
    );

    const { temp, humidity, pressure } = response.data.main;
    const windSpeed = response.data.wind.speed;
    const windDirection = response.data.wind.deg;
    const description = response.data.weather[0].description;

    const newCity = cityRepository.create({
      cityName,
      temperature: temp,
      humidity,
      pressure,
      windSpeed,
      windDirection,
      description,
    });

    await cityRepository.save(newCity);

    return successResponse({
      city: cityName,
      temperature: temp,
      humidity,
      pressure,
      windSpeed,
      windDirection,
      description,
    });
  } catch (error: any) {
    return handleError(error); 
  }
};
