import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have this library installed
import { useNavigation } from '@react-navigation/native';

const defaultColleges = [
  { id: '1', name: 'APOLLO' },
  { id: '2', name: 'AIIMS' },
  { id: '3', name: 'MAX HOSPITAL' },
  { id: '4', name: '24 X 7 CARE' },
  { id: '5', name: 'SARVADOYA' },
];

const Hospitals = ({ colleges = defaultColleges }) => {
  const navigation = useNavigation();

  const handleCollegeSelect = (item) => {
    if (item.name === 'APOLLO') {
      navigation.navigate('HospitalCanteen');
    } else {
      // Handle other colleges if necessary
      // For example, navigate to a different screen:
      // navigation.navigate('CollegeDetail', { collegeId: item.id });
    }
  };

  return (
    <FlatList
      data={colleges}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleCollegeSelect(item)} style={styles.collegeItem}>
          <View style={styles.collegeContent}>
            <View style={styles.collegeNameContainer}>
              <Text style={styles.collegeName}>{item.name}</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
      )}
      style={styles.collegeList}
      ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
    />
  );
};

const styles = StyleSheet.create({
  collegeList: {
    padding: 16,
  },
  collegeItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBlockColor: '#e0e0e0',
  },
  collegeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  collegeName: {
    fontSize: 18,
    color: '#333333',  
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});

export default Hospitals;
