import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : null,
      ]}>
      <Text
        style={[
          styles.text,
          styles[`containerText_${type}`],
          fgColor ? {color: fgColor} : null,
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
  },
  container_TERTAIARY: {
    backgroundColor: 'transparent',
  },
  containerText_TERTAIARY: {
    color: '#3777f0',
  },

  container_PRIMARY: {
    backgroundColor: '#3777f0',
  },
  containerText_PRIMARY: {
    color: '#ffffff',
  },
  container_SECONDARY: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#3777f0',
  },
  containerText_SECONDARY: {
    color: '#3777f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
  },
});
