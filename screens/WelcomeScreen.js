// screens/WelcomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Title>Welcome to Family Hub</Title>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 
  },
  button: { marginVertical: 8, width: '80%' },
});
