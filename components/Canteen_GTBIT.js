import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icon library
import { useNavigation } from '@react-navigation/native';

const CanteenGTBIT = () => {
const navigation = useNavigation();
  const canteenData = [
    { id: '1', name: 'MOTHER DAIRY', status: 'Open', deliveryTime: '07 mins' },
    { id: '2', name: 'NANKI CATERERS', status: 'Closed', deliveryTime: '15 mins' },
  ];

  const handleCanteenPress = (canteen) => {
    navigation.navigate('Menu', { canteenName: canteen.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canteens for GTBIT</Text>
      <FlatList
        data={canteenData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.canteenItem} 
            onPress={() => handleCanteenPress(item)}
            accessible={true}
            accessibilityLabel={`Go to menu for ${item.name}`}
          >
            <View style={styles.canteenContent}>
              <View style={styles.canteenInfo}>
                <Text style={styles.canteenName}>{item.name}</Text>
                <Text style={[styles.canteenStatus, { color: item.status === 'Open' ? '#4CAF50' : '#f44336' }]}>
                  Status: {item.status}
                </Text>
                <Text style={styles.canteenDeliveryTime}>
                  Delivery: {item.deliveryTime}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <View style={styles.circle}>
                  <MaterialIcons name="arrow-forward" size={24} color="#000" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No canteens available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  canteenItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  canteenContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  canteenInfo: {
    flex: 1,
  },
  canteenName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  canteenStatus: {
    fontSize: 14,
  },
  canteenDeliveryTime: {
    fontSize: 14,
    color: '#555',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEB3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CanteenGTBIT;
