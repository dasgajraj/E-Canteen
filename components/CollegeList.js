import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const defaultColleges = [
  { id: '1', name: 'GTBIT', deliveryUpdate: 'New food options available!' },
  { id: '2', name: 'IITM', deliveryUpdate: 'Canteen under renovation' },
  { id: '3', name: 'MAIT', deliveryUpdate: 'Free delivery on first order!' },
  { id: '4', name: 'MSIT', deliveryUpdate: 'Special discounts today!' },
  { id: '5', name: 'GTB4CEC', deliveryUpdate: '' },
];

const CollegeList = ({ colleges = defaultColleges, navigation }) => {
  const handleCollegeSelect = (college) => {
    if (college.name === 'GTBIT') {
      navigation.navigate('CanteenList', { entity: college.name });
    } else {
      console.log(`${college.name} does not have a canteen available.`);
    }
  };

  return (
    <FlatList
      data={colleges}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleCollegeSelect(item)}
          style={styles.collegeItem}
          accessible={true}
          accessibilityLabel={`Select ${item.name}`}
        >
          <View style={styles.collegeContent}>
            <View style={styles.collegeTextContent}>
              <Text style={styles.collegeName}>{item.name}</Text>
              {item.deliveryUpdate ? (
                <Text style={styles.deliveryUpdate}>{item.deliveryUpdate}</Text>
              ) : null}
            </View>
            <View style={styles.iconWrapper}>
              <View style={styles.iconBackground}>
                <MaterialIcons name="arrow-forward" size={24} color="black" />
              </View>
            </View>
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
    backgroundColor: '#F0F0F0',
    flex: 1,
  },
  collegeItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  collegeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  collegeTextContent: {
    flex: 1,
  },
  collegeName: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  deliveryUpdate: {
    fontSize: 14,
    color: '#FFA500',
    marginTop: 4,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE135',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});

export default CollegeList;