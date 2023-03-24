import {StyleSheet, View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const onSendPressed = data => {
    auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        console.log('Password reset email sent successfully');
        setModalVisible(true);
      })
      .catch(error => {
        console.log('Error sending password reset email: ', error);
      });
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };
  return (
    <ScrollView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
          navigation.navigate('SignIn');
        }}>
        <View style={styles.modalContent}>
          <Text>Password reset email sent successfully!</Text>
        </View>
      </Modal>

      <View style={styles.root}>
        <Text style={styles.title}>Reset your password </Text>
        <CustomInput
          name={'email'}
          placeholder={'Enter your Email'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
          }}
        />
        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />
        <CustomButton
          text={'Back to Sign In'}
          onPress={onSignInPressed}
          type={'TERTAIARY'}
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
