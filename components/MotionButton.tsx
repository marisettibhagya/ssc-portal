import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface MotionButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary-orange' | 'primary-red' | 'outline-light' | 'solid-black';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MotionButton = ({ onPress, title, style, textStyle, variant = 'primary-orange' }: MotionButtonProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const shadowY = useSharedValue(2);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      shadowOffset: { width: 0, height: shadowY.value }
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { stiffness: 300, damping: 15 });
    opacity.value = withTiming(0.8, { duration: 150 });
    shadowY.value = withSpring(0, { stiffness: 300, damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 300, damping: 15 });
    opacity.value = withTiming(1, { duration: 150 });
    shadowY.value = withSpring(2, { stiffness: 300, damping: 15 });
  };

  let containerStyle;
  let labelStyle;

  switch (variant) {
    case 'outline-light':
      containerStyle = styles.outlineContainer;
      labelStyle = styles.outlineText;
      break;
    case 'solid-black':
      containerStyle = styles.blackContainer;
      labelStyle = styles.blackText;
      break;
    case 'primary-red':
      containerStyle = styles.redContainer;
      labelStyle = styles.redText;
      break;
    case 'primary-orange':
    default:
      containerStyle = styles.orangeContainer;
      labelStyle = styles.orangeText;
      break;
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.baseContainer, containerStyle, style, animatedStyle]}
    >
      <Text style={[styles.baseText, labelStyle, textStyle]}>{title}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50, // Pill shape
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  orangeContainer: {
    backgroundColor: '#FF5A00',
  },
  orangeText: {
    color: '#FFFFFF',
  },
  redContainer: {
    backgroundColor: '#FF2A2A',
  },
  redText: {
    color: '#FFFFFF',
  },
  outlineContainer: {
    backgroundColor: '#FAFAF8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  outlineText: {
    color: '#111111',
  },
  blackContainer: {
    backgroundColor: '#111111',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  blackText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
