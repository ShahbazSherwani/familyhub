// screens/SafetyScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

export default function SafetyScreen() {
  // Dummy location (e.g., coordinates for Manila)
  const [location] = useState({ latitude: 14.5995, longitude: 120.9842 });

  const sendSafetyAlert = () => {
    alert(`Safety alert sent from (${location.latitude}, ${location.longitude})`);
  };

  return (
    <View style={styles.container}>
      <Title>Family Safety</Title>
      <Paragraph>Your current location:</Paragraph>
      <Paragraph>Latitude: {location.latitude}</Paragraph>
      <Paragraph>Longitude: {location.longitude}</Paragraph>
      <Button mode="contained" color="red" onPress={sendSafetyAlert} style={styles.button}>
        Send Safety Alert
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  button: { marginTop: 16 },
});
