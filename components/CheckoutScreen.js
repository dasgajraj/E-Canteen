import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CartScreen({ route, navigation }) {
  const { cart } = route.params;
  const [updatedCart, setUpdatedCart] = useState(cart);

  // Calculate total based on item quantities
  const total = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigation.navigate('Checkout', { cart: updatedCart, total });
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
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cartItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#FFE13560',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
