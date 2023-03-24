import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const {control, handleSubmit, errors} = useForm();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Home');
      }
    };
    checkToken();
  }, [navigation]);

  const onSignIn = data => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async response => {
        await AsyncStorage.setItem('token', response.user.uid);
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  const onSignUp = () => {
    navigation.navigate('SignUp');
  };
  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          name={'email'}
          placeholder={'Email'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
          }}
        />
        <CustomInput
          name={'password'}
          placeholder={'Password'}
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
        />
        <CustomButton text="Sign In" onPress={handleSubmit(onSignIn)} />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPassword}
          type="TERTIARY"
        />
        <CustomButton
          text="Don't have an account? Sign Up"
          type="TERTIARY"
          onPress={onSignUp}
        />
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  logo: {
    width: '70%',
    maxWidth: 400,
    maxHeight: 200,
  },
});
