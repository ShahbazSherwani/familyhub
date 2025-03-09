// components/AnimatedScreen.js
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';

const AnimatedScreen = ({ children }) => {
  return (
    <Animatable.View animation="fadeIn" duration={500} style={styles.container}>
      {children}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default AnimatedScreen;
