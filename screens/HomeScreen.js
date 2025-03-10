// screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedScreen from '../components/AnimatedScreen';
import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <AnimatedScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Family Hub</Text>
        {user && <Text style={styles.greeting}>{user.username}!</Text>}
      </View>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 20,
    color: '#333',
  },
});
