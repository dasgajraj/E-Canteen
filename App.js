import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import CollegeList from './components/CollegeList';
import MenuScreen from './components/MenuScreen';
import CartScreen from './components/CartScreen';
import Hospitals from './components/Hospitals';
import OfficeList from './components/OfficeList';
import CanteenGTBIT from './components/Canteen_GTBIT';
import Canteen_Apollo from './components/Canteen_Apollo';
import ProfileScreen from './components/ProfileScreen';
import LoadingScreen from './components/LoadingScreen'; 
import HospitalCanteen from './components/HospitalCanteen';


const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoading ? "Loading" : "Login"}>
        {isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PROFILE" component={ProfileScreen} />
            <Stack.Screen name="CollegeList" component={CollegeList} />
            <Stack.Screen name="Hospitals" component={Hospitals} />
            <Stack.Screen name="HospitalCanteen" component={HospitalCanteen} />
            <Stack.Screen name="OfficeList" component={OfficeList} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="CanteenList" component={CanteenGTBIT} />
            <Stack.Screen name="Canteen_Apollo" component={Canteen_Apollo} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
