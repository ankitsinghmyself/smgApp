import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import api from './utils/api';

class WeatherPage extends Component {
  state = {
    temperature: 0,
    description: '',
    icon: '',
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    api.getWeatherData().then(data => {
      this.setState({
        temperature: data.temperature,
        description: data.description,
        icon: data.icon,
      });
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000,
      }).start();
    });
  }

  render() {
    const {temperature, description, icon, fadeAnim} = this.state;
    return (
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <Image source={require(`./images/${icon}.png`)} style={styles.icon} />
        <Text style={styles.temp}>{temperature}°</Text>
        <Text style={styles.description}>{description}</Text>
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
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  temp: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
  },
});

export default WeatherPage;
