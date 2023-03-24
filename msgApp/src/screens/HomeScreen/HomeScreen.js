import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ChatHeader from '../ChatScreen/ChatHeader';
import ChatFooter from '../ChatScreen/ChatFooter';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Icon} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
const Home = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {uid} = firebase.auth().currentUser;
    const unsubscribe = firestore()
      .collection('Groups')
      .where('members', 'array-contains', uid)
      .onSnapshot(
        snapshot => {
          const updatedGroups = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGroups(updatedGroups);
          setLoading(false);
        },
        error => {
          console.error(error);
          setLoading(false);
        },
      );
    return unsubscribe;
  }, []);

  const handleGroupPress = group => {
    navigation.navigate('Chat', {groupId: group.id, groupName: group.name});
  };

  function convertToTitleCase(str) {
    return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const renderGroup = ({item}) => (
    <TouchableOpacity
      style={styles.list}
      onPress={() => handleGroupPress(item)}>
      <Text style={styles.name}>{convertToTitleCase(item.name)}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <ChatHeader />
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.clearButton}></TouchableOpacity>
        </View>
        <Text style={styles.title}>My Groups</Text>
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          {groups.length > 0 ? (
            <FlatList
              data={groups}
              renderItem={renderGroup}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>You have not joined any groups yet.</Text>
          )}
        </>
      )}

      <ChatFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  footerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#999',
  },
});

export default Home;
