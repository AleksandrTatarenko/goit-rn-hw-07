import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { collection, onSnapshot, getFirestore, query } from "firebase/firestore";
import app from "../../../firebase/config";
const db = getFirestore(app);

const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({...doc.data(), id: doc.id});
            });
            setPosts(posts);
        });
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
    <View style={styles.container}>
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({item}) =>
                <View style={{marginBottom: 10, justifyContent: "center", alignItems: "center"}}>
                    <Image source={{ uri: item.photo }} style={{ width: 350, height: 200, borderRadius: 10 }} />
                        <Text style={{fontSize: 16, color: '#BDBDBD'}}>{item.comment.name}</Text>
                        <Text style={{fontSize: 16, color: '#BDBDBD'}}>{item.comment.place}</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Map', item.location)}>
                            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('Comments', {id: item.id})}>
                            <Feather name="message-circle" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                </View>}
            />
        </View>
    </View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})

export default PostsScreen;