// ForecastScreen.js

import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import weatherUtils from '../utils/weatherUtils';
import Geolocation from '@react-native-community/geolocation';

const ForecastScreen = () => {
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [region, setRegion] = useState({
    latitude: 30.78825,
    longitude: -82.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [weather, setWeather] = useState({
    temp_c: 72,
    humidity: 40,
    wind_mph: 12,
    cloud: 'Sunny',
    name: 'Gainesville',
  });
  useEffect(() => {
    weatherUtils
      .getForecast(location.latitude, location.longitude)
      .then(data => {
        setWeather(data);
      });

    // get current location from device
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, [location.latitude, location.longitude]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={setRegion}
        mapType="satellite">
        <Marker
          coordinate={region}
          title={`Temperature: ${weather.temp_c}°C  `}
          description={`Humidity: ${weather.humidity}% Wind Speed: ${weather.wind_mph}mph`}
        />
      </MapView>
      {/* <Image
        source={require('../images/wlogo.png')}
        style={styles.background}
      /> */}
      {/* <View style={styles.headerContainer}>
        <Image source={require('../images/wlogo.png')} style={styles.icon} />
        <Text style={styles.headerText}>{weather.condition}</Text>
      </View> */}
      <View style={styles.bodyContainer}>
        <Text style={styles.tempText}>{weather.temp_c}°C</Text>
        <Text style={styles.locationText}>{weather.name} </Text>
      </View>

      {/* <TouchableOpacity style={styles.forecastButton}>
        <Text style={styles.forecastButtonText}>See 5-Day Forecast</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
  map: {
    width: 300,
    height: 300,
  },
});

export default ForecastScreen;
