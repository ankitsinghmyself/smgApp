import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import api from './utils/api';

class ForecastPage extends Component {
  state = {
    forecasts: [],
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    api.getForecastData().then(data => {
      this.setState({
        forecasts: data,
      });
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000,
      }).start();
    });
  }

  render() {
    const {forecasts, fadeAnim} = this.state;
    return (
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        {forecasts.map(forecast => (
          <View key={forecast.day} style={styles.forecastContainer}>
            <Image
              source={require(`./images/${forecast.icon}.png`)}
              style={styles.icon}
            />
            <Text style={styles.day}>{forecast.day}</Text>
            <Text style={styles.temp}>{forecast.temperature}°</Text>
            <Text style={styles.description}>{forecast.description}</Text>
          </View>
        ))}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  forecastContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  day: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  temp: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333333',
  },
});

export default ForecastPage;
