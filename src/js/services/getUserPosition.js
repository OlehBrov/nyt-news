import { renderWeather } from '../weatherWidget.js/weatherWidgetMarkup';
import { getWeather } from './fetch';

export let savedWeather = {};

export const successCallback = async position => {

  const weatherData = await getWeather(position.coords);

  // renderWeather(weatherData);
  savedWeather = weatherData;
  savedLocationWeather(savedWeather)
};

export const errorCallback = async error => {

  const defaultPosition = {
    latitude: 50.450001,
    longitude: 30.523333,
  };
  const defaultWeather = await getWeather(defaultPosition);
  savedWeather = defaultWeather;
  // renderWeather(defaultWeather);
   savedLocationWeather(savedWeather)
};

export const savedLocationWeather = storedWeather => {
 
  renderWeather(storedWeather);
};
