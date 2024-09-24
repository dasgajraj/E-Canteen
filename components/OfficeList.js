import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have this library installed

const defaultOffices = [
  { id: '1', name: 'Microsoft' },
  { id: '2', name: 'Infosys' },
  { id: '3', name: 'TCS' },
  { id: '4', name: 'MAHINDRA & MAHINDRA' },
  { id: '5', name: 'THE ALTAIRIAN' },
];

const OfficeList = ({ offices = defaultOffices, handleOfficeSelect }) => {
  return (
    <FlatList
      data={offices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleOfficeSelect(item)} style={styles.officeItem}>
          <View style={styles.officeContent}>
            <View style={styles.officeNameContainer}>
              <Text style={styles.officeName}>{item.name}</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
      )}
      style={styles.officeList}
      ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
    />
  );
};

const styles = StyleSheet.create({
  officeList: {
    padding: 16,
  },
  officeItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  officeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  officeName: {
    fontSize: 18,
    color: '#333333', // Text color
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});

export default OfficeList;
