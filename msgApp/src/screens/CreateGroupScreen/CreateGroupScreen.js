import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ChatHeader from '../ChatScreen/ChatHeader';
import ChatFooter from '../ChatScreen/ChatFooter';
import {TextInput} from 'react-native-paper';
import CustomButton from '../../components/CustomButton/CustomButton';
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const CreateGroupScreen = () => {
  const navigation = useNavigation();

  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateGroup = async () => {
    if (groupName.length > 0) {
      const {uid} = firebase.auth().currentUser;
      navigation.navigate('Home');

      try {
        const groupRef = await firestore()
          .collection('Groups')
          .add({
            name: groupName,
            description: description,
            members: [uid],
          });

        if (!groupRef.id) {
          console.error('Invalid group reference');
          return;
        }

        setGroupName('');
        setDescription('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <ChatHeader leftComponent={{text: 'Create Group'}} />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter group name"
          value={groupName}
          onChangeText={text => setGroupName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter group description"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <CustomButton
          style={styles.button}
          text="Create Group"
          onPress={handleCreateGroup}
        />
      </View>

      <ChatFooter />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '50',
    marginVertical: 10,
  },
});
export default CreateGroupScreen;
