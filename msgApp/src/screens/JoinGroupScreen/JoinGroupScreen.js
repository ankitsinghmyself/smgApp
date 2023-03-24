import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ChatHeader from '../ChatScreen/ChatHeader';
import ChatFooter from '../ChatScreen/ChatFooter';

const JoinGroupScreen = () => {
  const [allGroups, setAllGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserGroups = async () => {
      const {uid} = firebase.auth().currentUser;
      try {
        const userData = (
          await firestore().collection('Users').doc(uid).get()
        ).data();
        const joinedGroupIds = userData?.groups || [];
        const createdGroupIds = userData?.createdGroups || [];

        const userGroupIds = [...joinedGroupIds, ...createdGroupIds];
        setUserGroups(userGroupIds);
      } catch (e) {
        console.log(e);
      }
    };

    getUserGroups();
  }, []);

  useEffect(() => {
    const getAllGroups = async () => {
      try {
        const querySnapshot = await firestore().collection('Groups').get();
        const groups = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
        }));
        setAllGroups(groups);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    getAllGroups();
  }, []);

  const handleJoinGroup = async groupId => {
    const {uid} = firebase.auth().currentUser;

    await firestore()
      .collection('Groups')
      .doc(groupId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(uid),
      });

    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        groups: firebase.firestore.FieldValue.arrayUnion(groupId),
      });

    const updatedGroups = allGroups.filter(group => group.id !== groupId);
    setAllGroups(updatedGroups);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const filteredGroups = allGroups.filter(
    group => !userGroups.includes(group.id),
  );

  return (
    <View style={{flex: 1}}>
      <ChatHeader />
      {filteredGroups.length === 0 ? (
        <View style={styles.noGroupsContainer}>
          <Text style={styles.noGroupsText}>No groups available</Text>
        </View>
      ) : (
        <FlatList
          data={filteredGroups}
          renderItem={({item}) => (
            <View style={styles.list}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupDesc}>{item.description}</Text>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => handleJoinGroup(item.id)}>
                <Text style={styles.joinButtonText}>Join Group</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}

      <ChatFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGroupsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGroupsText: {
    fontSize: 20,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  groupDesc: {
    fontSize: 14,
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default JoinGroupScreen;
