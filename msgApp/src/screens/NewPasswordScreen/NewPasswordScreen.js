import {StyleSheet, View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const NewPasswordScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const {control, handleSubmit, errors, watch} = useForm();
  const onSubmitPressed = () => {
    console.warn('onSubmitPressed Up');

    navigation.navigate('Home');
  };

  const onSignInPressed = () => {
    console.warn(' onSignInPressed');

    navigation.navigate('SignIn');
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password </Text>
        <CustomInput placeholder={'Code'} value={code} setValue={setCode} />
        <CustomInput
          name={'newPassword'}
          placeholder={'Enter your new password'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
        />
        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
        <CustomButton
          text={'Back to Sign In'}
          onPress={onSignInPressed}
          type={'TERTAIARY'}
        />
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#051C60',
  },
  text: {
    fontSize: 14,
    color: '#051C60',
    marginTop: 20,
  },
  link: {
    color: '#fdb075',
    fontWeight: 'bold',
  },
});
