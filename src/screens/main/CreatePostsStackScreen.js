import React, { } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePostsScreen from "../nested/CreatePostsScreen";

const CreatePostsStack = createNativeStackNavigator();

const CreatePostsStackScreen = () => {
    return (
        <CreatePostsStack.Navigator>
            <CreatePostsStack.Screen name='Create' component={CreatePostsScreen} options={{headerShown:false}} />
        </CreatePostsStack.Navigator>
    )
};

export default CreatePostsStackScreen;
