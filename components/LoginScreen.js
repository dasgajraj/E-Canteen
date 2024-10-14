import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '@env';

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

WebBrowser.maybeCompleteAuthSession();

export default function ECanteenScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        // Attempt to create a new account
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Home');
      } else {
        // Attempt to sign in with existing account
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Check if the error is for email already in use
      if (isSignUp && error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Account Already Exists',
          'This email is already registered. Please log in instead.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Switch to Sign In mode and navigate to the login page
                setIsSignUp(false);
                // You could optionally navigate to any SignIn screen if needed
                navigation.navigate('SignIn');
              }
            }
          ]
        );
      } else {
        Alert.alert('Authentication Error', 'Incorrect email or password. Please try again.');
      }
    }
  };
  
  

  const handleGoogleSignIn = async () => {
    const result = await promptAsync();
    if (result?.type === 'success') {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert('Success', 'Logged in with Google!');
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.error('Google Sign-In Error:', error);
          Alert.alert('Google Sign-In Error', 'An error occurred. Please try again.');
        });
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

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn} disabled={!request}>
          <Text style={styles.buttonText}>Sign In with Google</Text>
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
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 15,
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
