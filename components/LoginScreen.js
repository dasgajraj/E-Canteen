import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxWTmBsslJZ80e7mEbDBtCi7FNlrMSuJE",
  authDomain: "ecanteen-4ab1b.firebaseapp.com",
  projectId: "ecanteen-4ab1b",
  storageBucket: "ecanteen-4ab1b.appspot.com",
  messagingSenderId: "65494167458",
  appId: "1:65494167458:web:d3cdfbbafce02a6c5b8cfb",
  measurementId: "G-P52Q86NJ83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function ECanteenScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Home');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Authentication Error', 'Incorrect email and password. Please try again .');
    }
  };

  const toggleSignUp = () => {
    setIsSignUp((prevState) => !prevState);
  };

  return (
    <LinearGradient colors={['#FF7E5F', '#FEB47B']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/logo_jpg (2).png')} style={styles.logo} />
        <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'E-Canteen'}</Text>
        <Text style={styles.subtitle}>{isSignUp ? 'Create your account' : 'Please log in to continue'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchButton} onPress={toggleSignUp}>
          <Text style={styles.switchButtonText}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginHorizontal: 10,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    color: '#FFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});