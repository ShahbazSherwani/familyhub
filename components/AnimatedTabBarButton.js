// components/AnimatedTabBarButton.js
import React, { useRef } from 'react';
import { Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function AnimatedTabBarButton({ children, onPress, ...rest }) {
  const buttonRef = useRef(null);

  const handlePressIn = () => {
    if (buttonRef.current) {
      buttonRef.current.bounce(800);
    }
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} {...rest}>
      <Animatable.View ref={buttonRef}>
        {children}
      </Animatable.View>
    </Pressable>
  );
}
