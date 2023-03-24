// App.tsx
import React, {useState} from 'react';
import {View} from 'react-native';
import ForecastScreen from './src/screens/ForecastScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('forecast');

  let screen;
  if (currentScreen === 'forecast') {
    screen = (
      <ForecastScreen switchScreen={screen => setCurrentScreen(screen)} />
    );
  }
  return <View style={{flex: 1}}>{screen}</View>;
};

export default App;
