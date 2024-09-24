import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import { Search } from 'lucide-react-native';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const items = ['COLLEGES', 'HOSPITALS', 'OFFICE'];
  const images = [
    require('../assets/food1.png'),
    require('../assets/food3.png'),
    require('../assets/food2.png'), 
  ];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleItemClick = (item) => {
    if (item === 'COLLEGES') {
      navigation.navigate('CollegeList');
    } else if (item === 'HOSPITALS') {
      navigation.navigate('Hospitals');
    } else if (item === 'OFFICE') {
      navigation.navigate('OfficeList');
    }
  };

  const handleSearchButtonPress = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const renderTextWithBorders = (text) => {
    return text.split('').map((char, index) => (
      <Text key={index} style={styles.characterText}>
        {char}
      </Text>
    ));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <ImageBackground
      source={require('../assets/pattern2.png')} // Background image for the whole page
      style={styles.container}
      imageStyle={{ opacity: 0.2 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search...'
            value={searchText}
            onChangeText={setSearchText}
            ref={searchInputRef}
          />
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ImageBackground
              source={
                item === 'COLLEGES' ? require('../assets/2.png') :
                item === 'HOSPITALS' ? require('../assets/hospital.png') :
                require('../assets/1.png')
              }
              style={styles.itemButton}
              imageStyle={styles.itemBackgroundImage}
            >
              <TouchableOpacity
                onPress={() => handleItemClick(item)}
                style={styles.touchableArea}
              >
                <Text style={styles.itemText}>
                  {renderTextWithBorders(item)}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.imageContainer}>
          <Image source={images[currentImageIndex]} style={styles.squareImage} />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
            <Text>★</Text>
            <Text>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={handleSearchButtonPress}>
            <Search />
            <Text>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('PROFILE')}>
            <Text>○</Text>
            <Text>PROFILE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // Allow the ScrollView to grow
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  searchInput: {
    flex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 5,
    borderRadius: 5,
    color: '#333',
  },
  listContainer: {
    padding: 20,
  },
  itemButton: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    height: 100, // Set height for the item
    justifyContent: 'center',
  },
  touchableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  itemBackgroundImage: {
    borderRadius: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10, 
  },
  squareImage: {
    width: 352, 
    height: 285, 
    resizeMode: 'cover', 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
  },
  footerItem: {
    alignItems: 'center',
  },
  characterText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 5,
    margin: 2,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default HomeScreen;
