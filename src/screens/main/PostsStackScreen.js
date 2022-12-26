import React from "react";
import { } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostsScreen from '../nested/PostsScreen';
import MapScreen from "../nested/MapScreen";
import CommentsScreen from '../nested/CommentsScreen';

const PostsStack = createNativeStackNavigator();

const PostsStackScreen = () => {
    return (<PostsStack.Navigator initialRouteName="Posts">
        <PostsStack.Screen name='Posts' component={PostsScreen} options={{
            headerShown: false
        }} />
        <PostsStack.Screen name='Map' component={MapScreen} options={{
            headerShown: false,
        }} />
        <PostsStack.Screen name='Comments' component={CommentsScreen} options={{
            headerShown: false
        }} />
    </PostsStack.Navigator>)
};

export default PostsStackScreen;
