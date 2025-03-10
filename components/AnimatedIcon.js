// components/AnimatedIcon.js
import React from 'react';
import { Feather } from '@expo/vector-icons';

const AnimatedIcon = ({ name, size, color }) => {
  return <Feather name={name} size={size} color={color} />;
};

export default AnimatedIcon;
