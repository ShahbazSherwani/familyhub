// screens/WelcomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function WelcomeScreen({ navigation }) {
  return (
    <Animatable.View animation="fadeIn" duration={500} style={styles.container}>
      <Title>Welcome to Family Hub</Title>
      <Button mode="contained" onPress={() => navigation.navigate('Login')} style={styles.button}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Register')} style={styles.button}>
        Register
      </Button>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  button: { marginVertical: 8, width: '80%' },
});
