import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Sample menu data
const menuData = [
  { id: 1, name: 'Pizza', description: 'Cheese pizza', price: 100, prepTime: '15 mins', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Burger', description: 'Veg burger with lettuce and tomato', price: 59, prepTime: '10 mins', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=3399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Pastries', description: 'Delicious pastries', price: 40, prepTime: '15 mins', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, name: 'Fries', description: 'Crispy Peri-Peri fries', price: 60, prepTime: '8 mins', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=3399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, name: 'Kulcha', description: 'Paneer Kulcha with basil leaves', price: 40, prepTime: '3 mins', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=3384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Kurkure', description: 'Crispy snack', price: 10, prepTime: '1 mins', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=3384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

export default function MenuScreen({ route, navigation }) {
  const college = route.params.college; 
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  
  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: quantities[item.id] || 1 }]);
  };

  
  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const currentQuantity = prev[id] || 0;
      const newQuantity = Math.max(0, currentQuantity + delta); // Prevent negative quantity
      return { ...prev, [id]: newQuantity };
    });
  };

  
  const handleCheckout = () => {
    navigation.navigate('Cart', { cart });
  };

  return (
    <LinearGradient colors={['#ECE9E6', '#FFFFFF']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{college} Canteen Menu</Text>
        {menuData.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.foodImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={styles.itemDetails}>
                <MaterialIcons name="schedule" size={18} color="#3E4C59" />
                <Text style={styles.prepTime}>{item.prepTime}</Text>

                <View style={styles.priceContainer}>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>

                
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantities[item.id] || 0}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 100, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E4C59',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9', 
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, 
    shadowRadius: 5,
    elevation: 5,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3E4C59', 
  },
  itemDescription: {
    color: '#7F8A97',
    marginVertical: 5,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between', 
  },
  prepTime: {
    marginLeft: 5,
    color: '#7F8A97',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    color: '#3E4C59',
    marginLeft: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, 
  },
  quantityButton: {
    backgroundColor: '#FFD70090',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: '#FFD70060',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#FFD700',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
