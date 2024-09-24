// components/CanteenList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CollegeList from './components/CollegeList';
import OfficeList from './components/OfficeList';
import Hospitals from './components/Hospitals';
// Sample canteen data for each entity


const canteenData = {
  'GTBIT': [
    { id: '1', name: 'GTBIT Canteen A' },
    { id: '2', name: 'GTBIT Canteen B' },
  ],
  'IITM': [
    { id: '1', name: 'IITM Canteen A' },
    { id: '2', name: 'IITM Canteen B' },
  ],
  'MAIT': [
    { id: '1', name: 'MAIT Canteen A' },
    { id: '2', name: 'MAIT Canteen B' },
  ],
  'MSIT': [
    { id: '1', name: 'MSIT Canteen A' },
    { id: '2', name: 'MSIT Canteen B' },
  ],
  'GTB4CEC': [
    { id: '1', name: 'GTB4CEC Canteen A' },
    { id: '2', name: 'GTB4CEC Canteen B' },
  ],
  'HOSPITALS': [
    { id: '1', name: 'Hospital Canteen A' },
    { id: '2', name: 'Hospital Canteen B' },
  ],
  'OFFICES': [
    { id: '1', name: 'Office Canteen A' },
    { id: '2', name: 'Office Canteen B' },
  ],
};

const CanteenList = ({ route }) => {
  const { entity } = route.params; // Get the passed entity (college name or HOSPITALS, OFFICES)

  const canteens = canteenData[entity] || []; // Get the canteens for the selected entity

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canteens for {entity}</Text>
      <FlatList
        data={canteens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.canteenItem}>
            <Text style={styles.canteenName}>{item.name}</Text>
          </View>
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

export default CanteenList;
