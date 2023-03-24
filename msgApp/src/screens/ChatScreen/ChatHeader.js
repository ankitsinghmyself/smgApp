import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {Button, Menu, Modal, Text, TextInput} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

const ChatHeader = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [groupName, setGroupName] = useState('');
  const [visible, setVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleLogout = () => {
    AsyncStorage.removeItem('token');
    navigation.navigate('SignIn');
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.primary},
        isDarkMode && styles.darkModeContainer,
      ]}>
      <Header
        containerStyle={[
          styles.header,
          {backgroundColor: colors.primary},
          isDarkMode && styles.darkModeHeader,
        ]}
        leftComponent={{
          text: 'Chats',
          style: [
            styles.title,
            {color: colors.text},
            isDarkMode && styles.darkModeTitle,
          ],
        }}
        rightComponent={
          <View style={styles.rightComponent}>
            <TouchableOpacity onPress={handleToggleDarkMode}>
              <Icon
                name={isDarkMode ? 'weather-sunny' : 'moon-waning-crescent'}
                type="material-community"
                color={colors.text}
              />
            </TouchableOpacity>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Icon
                  name="dots-vertical"
                  type="material-community"
                  color={colors.text}
                  onPress={openMenu}
                />
              }
              style={[
                styles.menuContainer,
                {backgroundColor: colors.background},
                isDarkMode && styles.darkModeMenu,
              ]}>
              <Menu.Item
                onPress={() => {
                  navigation.navigate('CreateGroup');
                  setVisible(false);
                }}
                title="New Group"
                titleStyle={{color: colors.text}}
              />

              <Menu.Item
                onPress={handleLogout}
                title="Logout"
                titleStyle={{color: colors.text}}
              />
            </Menu>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
  },
  darkModeContainer: {
    backgroundColor: '#121212',
    borderBottomWidth: 0,
  },
  header: {
    borderBottomWidth: 0,
  },
  darkModeHeader: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 20,
  },
  darkModeTitle: {
    color: '#fff',
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    marginTop: 40,
  },
  darkModeMenu: {
    backgroundColor: '#2d2d2d',
  },
});

export default ChatHeader;
