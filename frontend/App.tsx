import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import RegistrationScreen from './screens/Registration';
import HomeScreen from './screens/HomeScreen'
import MapScreen from './screens/MapScreen'

const Stack = createNativeStackNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login'}}
        />
        <Stack.Screen 
          name="Registration" 
          component={RegistrationScreen}
          options={{ title: 'Registration'}}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home'}}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Map'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};