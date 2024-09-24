import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home'); // Navigate to Home on successful login
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Authentication Error', 'Incorrect email or password. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#FF7E5F', '#FEB47B']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Please log in to continue</Text>

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
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',  
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
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
  loginButton: {
    backgroundColor: '#FF6F61',  
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
