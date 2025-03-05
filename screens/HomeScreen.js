// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Title>Family Hub Home</Title>
      <Paragraph>Welcome to your family management app!</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});
