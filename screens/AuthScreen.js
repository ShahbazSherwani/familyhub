// screens/AuthScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';

export default function AuthScreen({ navigation }) {
  const handleLogin = () => {
    // In a real app, you'd verify credentials here.
    navigation.replace("MainApp");
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome to Family Hub</Title>
      <Button mode="contained" onPress={handleLogin}>Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
});
