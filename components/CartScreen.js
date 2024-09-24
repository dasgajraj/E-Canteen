import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Alert } from 'react-native';

export default function CartScreen({ route, navigation }) {
  const { cart } = route.params;
  const [updatedCart, setUpdatedCart] = useState(cart);
  const total = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [sliderWidth, setSliderWidth] = useState(300);
  const sliderAnimation = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPosition = Math.max(0, Math.min(gestureState.dx, sliderWidth - 60));
        sliderAnimation.setValue(newPosition);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > sliderWidth * 0.8) {
          handleCheckout();
        } else {
          resetSlider();
        }
      },
    })
  ).current;

  const handleCheckout = () => {
    Alert.alert(
      "Confirm Checkout",
      "Your order will be delivered!",
      [
        { text: "OK", onPress: () => navigation.navigate('Checkout', { cart: updatedCart, total }) },
      ]
    );
    resetSlider();
  };

  const resetSlider = () => {
    Animated.timing(sliderAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {updatedCart.map((item, index) => (
        <View key={index} style={styles.cartItem}>
          <Text style={styles.itemName}>
            {item.name} - ₹{item.price} x {item.quantity}
          </Text>
        </View>
      ))}
      <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>

      <View
        style={styles.sliderContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setSliderWidth(width);
        }}
      >
        <Animated.View
          style={[styles.slider, { transform: [{ translateX: sliderAnimation }] }]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.sliderText}>{'>'}</Text>
        </Animated.View>
        <Text style={styles.sliderLabel}>Slide to Checkout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  sliderContainer: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  slider: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  sliderText: {
    fontSize: 24,
    color: '#333',
  },
  sliderLabel: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
  },
});
