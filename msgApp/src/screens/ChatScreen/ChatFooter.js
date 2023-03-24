import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function ChatFooter() {
  const navigation = useNavigation();

  const handleJoinGroup = () => {
    navigation.navigate('JoinGroup');
  };
  return (
    <View style={styles.footer}>
      <View style={styles.footerButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerButton}>
        <TouchableOpacity onPress={handleJoinGroup}>
          <Text style={styles.footerButtonText}>Join Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  joinButton: {
    backgroundColor: '#2e64e5',
  },
  chatButton: {
    backgroundColor: '#2e64e5',
  },
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
  footerButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  footerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
