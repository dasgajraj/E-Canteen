// SplashScreen.js
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';

const SplashScreen = ({ onAnimationFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationFinish();
    }, 3000); // Duration of the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Lottie source={require('./path/to/your/logo-animation.json')} autoPlay loop />
    </View>
  );
};

export default SplashScreen;
