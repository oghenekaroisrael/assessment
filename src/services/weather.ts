import axios from 'axios';
import {IResponse} from '../types';

const API_KEY = '974a93a0b523af299cbf97ee1dafd662';

export const fetchWeatherData = async (lon = 0, lat = 0) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    const payload: IResponse = res.data;
    return {payload};
  } catch (error) {
    return {error};
  }
};

export const fetchForecastData = async (lon = 0, lat = 0) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    const payload: IResponse[] = res.data.list;
    return {payload};
  } catch (error) {
    return {error};
  }
};
