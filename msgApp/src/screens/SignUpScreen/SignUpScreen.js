import {StyleSheet, View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const SignUpScreen = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, errors, watch} = useForm();
  const pwd = watch('password', '');

  const onRegister = data => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
        // Signed up successfully
        auth().currentUser.sendEmailVerification();
        const user = userCredential.user;
        console.warn('Email sent', user.email);

        // Store user data in the Users collection
        firestore()
          .collection('Users')
          .doc(user.uid)
          .set({
            email: user.email,
            displayName: user.email.split('@')[0],
            createdAt: new Date(),
          })
          .then(() => {
            console.log('User data added to Firestore!');
          })
          .catch(error => {
            console.error('Error adding user data to Firestore: ', error);
          });

        // Do something with the user object
        navigation.navigate('SignIn');
      })
      .catch(error => {
        // Handle errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  const onSignIn = () => {
    navigation.navigate('SignIn');
  };

  const ourTerms = () => {
    console.warn('Our Terms');
  };
  const privacyPolicy = () => {
    console.warn('Privacy Policy');
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an Account</Text>
        <CustomInput
          name={'email'}
          placeholder={'Email'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email address',
            },
          }}
        />
        <CustomInput
          name={'password'}
          placeholder={'Password'}
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
          secureTextEntry
        />
        <CustomInput
          name={'confirmPassword'}
          placeholder={'Confirm Password'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Confirm Password is required',
            },
            validate: value =>
              value === pwd || 'Password and Confirm Password must be the same',
          }}
          secureTextEntry
        />
        <CustomButton text="Register" onPress={handleSubmit(onRegister)} />
        <Text style={styles.text}>
          By registering, you agree to
          <Text style={styles.link} onPress={ourTerms}>
            {' '}
            our Terms
          </Text>{' '}
          of Service and{' '}
          <Text style={styles.link} onPress={privacyPolicy}>
            {' '}
            Privacy Policy.
          </Text>
        </Text>
        <CustomButton
          text="Have an account? Sign In"
          type="TERTIARY"
          onPress={onSignIn}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

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
