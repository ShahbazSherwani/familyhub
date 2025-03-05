// screens/SettingsScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button, Paragraph } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Uncomment if you use AsyncStorage for tokens

export default function SettingsScreen({ navigation }) {
  const handleLogout = async () => {
    // Clear token and user data (if stored in AsyncStorage, for example)
    // await AsyncStorage.removeItem('userToken');
    alert('Logged out');
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.container}>
      <Title>Settings</Title>
      {/* You can add more settings options here */}
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
      <Paragraph style={styles.info}>Adjust your settings here.</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  button: { marginVertical: 16, width: '80%' },
  info: { marginTop: 16, textAlign: 'center' },
});
