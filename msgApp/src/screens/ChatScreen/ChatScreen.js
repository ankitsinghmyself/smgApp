import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatHeader from './ChatHeader';
import {Text} from 'react-native';

const ChatScreen = ({route}) => {
  const {groupId} = route.params;

  const [messages, setMessages] = useState([]);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    const userRef = firestore().collection('Users').doc(uid);
    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          setDisplayName(doc.data().displayName);
        } else {
          console.log('No user data found');
        }
      })
      .catch(error => console.error(error));
    const unsubscribe = firestore()
      .collection('Messages')
      .where('groupId', '==', groupId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        if (snapshot && !snapshot.empty) {
          const newMessages = snapshot.docs.map(doc => {
            const message = doc.data();
            return {
              _id: doc.id,
              text: message.text,
              createdAt: message.createdAt.toDate(),
              user: message.user,
            };
          });
          setMessages(newMessages);
        } else {
          console.log('No documents found');
        }
      });

    return () => unsubscribe();
  }, [groupId]);

  const handleSend = useCallback(
    async (newMessages = []) => {
      const message = newMessages[0];
      await firestore()
        .collection('Messages')
        .add({
          groupId,
          text: message.text,
          user: {
            _id: message.user._id,
            displayName: message.user.displayName,
          },
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

      const updatedMessages = GiftedChat.append(messages, newMessages);
      setMessages(updatedMessages);
    },
    [groupId, messages],
  );
  return (
    <>
      <ChatHeader />
      <SafeAreaView style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: firebase.auth().currentUser.uid,
            displayName: displayName,
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default ChatScreen;
