import React from "react";
import { } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from "../nested/ProfileScreen";
import MapScreen from "../nested/MapScreen";
import CommentsScreen from '../nested/CommentsScreen';

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
    return (<ProfileStack.Navigator initialRouteName="Profile">
        <ProfileStack.Screen name='Profile' component={ProfileScreen} options={{
            headerShown: false
        }} />
        <ProfileStack.Screen name='Map' component={MapScreen} options={{
            headerShown: false,
        }} />
        <ProfileStack.Screen name='Comments' component={CommentsScreen} options={{
            headerShown: false
        }} />
    </ProfileStack.Navigator>)
};

export default ProfileStackScreen;
