import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView, 
    FlatList
} from 'react-native';
import app from "../../../firebase/config";
import { getFirestore, collection, addDoc, doc, query, onSnapshot } from "firebase/firestore";
const db = getFirestore(app);

const CommentScreen = ({ route }) => {
    const { id } = route.params;
    const { nickname } = useSelector((state) => state.auth);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([])
    const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
    const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 20 * 2);

    const getAllComments = async () => {
        const postRef = doc(db, 'posts', id);
        const q = query(collection(postRef, "comments"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const comments = [];
            querySnapshot.forEach((doc) => {
                comments.push(doc.data());
            });
            setComments(comments);
        });
        console.log(comments);
    }
    
    const createComment = async () => {
        const postRef = doc(db, 'posts', id);
        await addDoc(collection(postRef, 'comments'), {
            nickname: nickname,
            comment: comment
        });
        setIsOpenKeyboard(false);
        Keyboard.dismiss();
        setComment('');
    };

    useEffect(() => {
        console.log(id)
        getAllComments();
        const onChange = () => {
            const width = Dimensions.get("window").width-20*2;
            setDimensions(width);
        };
        Dimensions.addEventListener('change', onChange);
    }, []);

    const keyboardHide = () => {
    setIsOpenKeyboard(false);
    Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={comments}
                        renderItem={({ item }) =>
                            <View style={styles.commentsContainer} >
                                <Text style={styles.nickname}>{item.nickname}</Text>
                                <Text style={styles.comment}>{item.comment}</Text>
                            </View>
                        }
                        keyExtractor={(item, indx) => indx.toString()}
                    />   
                </SafeAreaView>
                <View style={styles.form}>
                    <TextInput
                        style={{...styles.input, width: dimensions}}
                        placeholder='Введите комментарий'
                        onFocus={() => setIsOpenKeyboard(true)}
                        value={comment}
                        onChangeText={(value)=>setComment(value)}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={createComment}>
                        <Text style={styles.send}>Отправить</Text>
                    </TouchableOpacity>  
                </View>
            </View>  
        </TouchableWithoutFeedback>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    commentsContainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    nickname: {
        color: 'black'
    },
    comment: {
        color: "#BEBEBE"
    },
    form: {
        padding: 25,
        backgroundColor: "#fff",
        alignItems: 'center',
    },
    input: {
        padding: 10,
        marginTop: 16,
        fontFamily:"Roboto-Regular",
        fontSize: 16,
        color: "#BDBDBD",
        borderWidth: 1,
        borderColor: "#BDBDBD"
    },
    send: {
        fontSize: 16,
        color: 'grey',
    },
    sendButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 80,
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
})

export default CommentScreen;