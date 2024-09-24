import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Navigation } from 'lucide-react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProfileScreen = () => {
  const [showMoreHelp, setShowMoreHelp] = useState(false);
  const [showMoreAbout, setShowMoreAbout] = useState(false);
  const animatedHeightHelp = useRef(new Animated.Value(0)).current;
  const animatedHeightAbout = useRef(new Animated.Value(0)).current;

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (section === 'help') {
      setShowMoreHelp(!showMoreHelp);
      Animated.timing(animatedHeightHelp, {
        toValue: showMoreHelp ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (section === 'about') {
      setShowMoreAbout(!showMoreAbout);
      Animated.timing(animatedHeightAbout, {
        toValue: showMoreAbout ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder avatar, replace with real image
          />
          <View>
            <Text style={styles.username}>USERNAME</Text>
            <Text style={styles.userType}>user</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <Ionicons name="person-circle-outline" size={24} color="#0017FF" />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuText}>My Account</Text>
          <Text style={styles.menuSubText}>Make changes to your account</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <MaterialIcons name="logout" size={24} color="#0017FF" />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuText}>Log out</Text>
          <Text style={styles.menuSubText}>Further secure your account for safety</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>More</Text>

      {/* Help & Support Section */}
      <TouchableOpacity style={styles.menuItem} onPress={() => toggleSection('help')}>
        <View style={styles.menuIcon}>
          <Ionicons name="help-circle-outline" size={24} color="#0017FF" />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuText}>Help & Support</Text>
        </View>
      </TouchableOpacity>
      {showMoreHelp && (
        <Animated.View style={[styles.moreContent, {
          height: animatedHeightHelp.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 150] // Adjust the output range based on your content height
          }),
        }]}>
          <Text style={styles.moreText}>
            Need assistance? We're here to help! For account-related issues or troubleshooting, feel free to contact our support team. You can reach us via email at support@ecanteen.com or call our customer service at +123-456-7890.
          </Text>
        </Animated.View>
      )}
      <TouchableOpacity style={styles.menuItem} onPress={() => toggleSection('about')}>
        <View style={styles.menuIcon}>
          <Ionicons name="information-circle-outline" size={24} color="#0017FF" />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuText}>About App</Text>
        </View>
      </TouchableOpacity>
      {showMoreAbout && (
        <Animated.View style={[styles.moreContent, {
          height: animatedHeightAbout.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300] 
          }),
        }]}>
          <Text style={styles.moreText}>
            Welcome to eCanteen, your go-to solution for convenient and delicious food delivery in hospitals, colleges, and offices. Our mission is to make quality meals accessible to everyone, no matter where you are. With just a few taps, you can order a variety of healthy and satisfying meals tailored to your taste. 
            Created by a dedicated team of innovators—Nishant Garg, Abbas Ali, Das Gajraj Sharma, and Jivika Chawla—our app reflects our passion for good food and community service.
          </Text>
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  profileContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userType: {
    fontSize: 14,
    color: '#777',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  menuSubText: {
    fontSize: 14,
    color: '#777',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  moreContent: {
 overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  moreText: {
    fontSize: 14,
    color: '#777',
  },
});

export default ProfileScreen;