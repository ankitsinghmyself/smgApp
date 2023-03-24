import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
          </View>
          <Text style={styles.error}>{error && error.message}</Text>
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  input: {
    width: '100%',
    height: 50,
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5,
    alignSelf: 'stretch',
  },
});
