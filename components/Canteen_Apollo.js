import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Canteen_Apollo = () => {
  const navigation = useNavigation();

  
  const canteenData = [
    { id: '1', name: 'NESCAFE' },
    { id: '2', name: 'NORTH INDIA GROUP' },
    { id: '3', name: 'SUB-WAY'}
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
            <Text style={styles.canteenName}>{item.name}</Text>
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
  canteenName: {
    fontSize: 18,
  },
});

export default Canteen_Apollo;
