import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import Navigation from './src/navigation';
const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9fbfc',
  },
});

export default App;
