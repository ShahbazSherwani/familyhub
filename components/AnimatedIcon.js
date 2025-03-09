// components/AnimatedIcon.js
import React, { useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';

const AnimatedIcon = ({ name, size, color }) => {
  const iconRef = useRef(null);

  const handlePressIn = () => {
    if (iconRef.current) {
      iconRef.current.bounce(800);
    }
  };

  return (
    <Animatable.View ref={iconRef} onTouchStart={handlePressIn}>
      <Feather name={name} size={size} color={color} />
    </Animatable.View>
  );
};

export default AnimatedIcon;
