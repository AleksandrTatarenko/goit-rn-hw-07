import React from "react";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperation";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
// import { MaterialCommunityIcons } from "@expo/vector-icons";

import  CreatePostsStackScreen  from './main/CreatePostsStackScreen';
import  PostsStackScreen  from './main/PostsStackScreen';
import ProfileScreen from './main/ProfileScreen';

const MainTab = createBottomTabNavigator();

import { } from 'react-native';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

    return (
      <MainTab.Navigator initialRouteName="Posts" screenOptions={{ "tabBarShowLabel": false, "tabBarStyle": [{ "display": "flex" }, null], 'tabBarStyle': { 'paddingHorizontal': 50, 'paddingTop': 10, 'paddingBottom': 10, 'height': 60 } }}>
        <MainTab.Screen
          name='PostsStack'
          component={PostsStackScreen}
          options={{
            title: 'Публикации',
            headerTitleStyle:{marginLeft: 135},
            headerShown: true,
            tabBarIcon: ({ focused, size, color }) => (<Ionicons name="grid-outline" size={size} color={color} />),
            tabBarActiveTintColor: '#FF6C00',
            tabBarInactiveTintColor: '#BDBDBD',
          }} />
        <MainTab.Screen
          name='CreateStack'
          component={CreatePostsStackScreen}
          options={{
            title: 'Создать публикацию',
            headerShown: true,
            headerTitleStyle:{marginLeft: 40},
            tabBarIcon: ({ focused, size, color }) => (<AntDesign name="plus" size={size} color={color} />),
            headerLeft: () => (<TouchableOpacity style={{ marginLeft: 20 }} onPress={()=>(navigation.navigate('Posts'))}><AntDesign name="arrowleft" size={24} color='#BDBDBD' /></TouchableOpacity>),
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#BDBDBD',
            tabBarItemStyle: { backgroundColor: '#FF6C00', borderRadius: 50},
          }} />
        <MainTab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            title: 'Мой профиль',
            headerShown: true,
            headerTitleStyle:{marginLeft: 135},
            headerRight: () => (<TouchableOpacity style={{ marginRight: 20 }}
              onPress={() => dispatch(authSignOutUser())}
            ><Ionicons name="md-exit-outline" size={30} color='#BDBDBD' /></TouchableOpacity>),
            tabBarIcon: ({ focused, size, color }) => (<Feather name="user" size={size} color={color} />),
            tabBarActiveTintColor: '#FF6C00',
            tabBarInactiveTintColor: '#BDBDBD',
          }} />
      </MainTab.Navigator>)
};

export default Home;