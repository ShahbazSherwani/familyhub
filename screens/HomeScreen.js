// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedScreen from '../components/AnimatedScreen';

export default function HomeScreen() {
  return (
    <AnimatedScreen>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Family Hub Home</Text>
      </View>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18 },
});
