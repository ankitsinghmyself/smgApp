import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';

class WelcomePage extends Component {
  state = {
    opacity: new Animated.Value(0),
    logoY: new Animated.Value(-100),
  };

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 2000,
      }),
      Animated.timing(this.state.logoY, {
        toValue: 0,
        duration: 2000,
      }),
    ]).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('YourImagePath')}
          style={[
            styles.logo,
            {
              opacity: this.state.opacity,
              transform: [{translateY: this.state.logoY}],
            },
          ]}
        />
        <Animated.Text style={[styles.title, {opacity: this.state.opacity}]}>
          Welcome to Your Weather App
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, {opacity: this.state.opacity}]}>
          Get real-time weather information for your location
        </Animated.Text>
      </View>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
});

export default WelcomePage;
