// forecastUtils.js
import axios from 'axios';
const weatherUtils = {
  getForecast: async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=47b6539ffaa049ffb6a44640231302&q=${latitude},${longitude}&aqi=yes
        `,
      );
      const {wind_mph, temp_c, humidity} = response.data.current;
      const {name} = response.data.location;

      return {wind_mph, temp_c, humidity, name};
    } catch (error) {
      console.log(error);
    }
  },
};

export default weatherUtils;
