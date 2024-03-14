import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/app/auth/Login';
import SignUp from './src/app/auth/SignUp';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;