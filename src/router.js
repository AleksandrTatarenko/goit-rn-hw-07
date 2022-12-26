import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import Home from './screens/Home'

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  if (isAuth) {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name='home' component={Home} options={{ headerShown: false }}/>
      </HomeStack.Navigator>
    )
  }
  return (
    <AuthStack.Navigator initialRouteName="login">
      <AuthStack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name='registration' component={RegistrationScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
};