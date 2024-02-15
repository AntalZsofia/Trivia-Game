import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Decline from '../assets/icons/decline.png';

import { useFocusEffect } from '@react-navigation/native';


export default function MessagesScreen({ navigation }) {
    const { token, userId } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchMessages = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/message/all`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log('Messages fetched successfully', data);
                        setMessages(data);
                    } else {
                        console.log('Fetching messages failed', data.error);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            fetchMessages();
        }, [token, userId])
    );
    const deleteMessage = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/message/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Message deleted successfully', data);
                setMessages(prevMessages => prevMessages.filter(message => message._id !== id));
            } else {
                console.log('Deleting message failed', data.error);
            }
        }
        catch (err) {
            console.error(err);
        }
    }



    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.message}>{item.Message}</Text>
                            <Pressable style={styles.deleteButton} onPress={() => deleteMessage(item._id)}>
                                <Image source={Decline} style={{ width: 40, height: 40 }} />
                            </Pressable>
                        </View>
                    </View>
                )}
            />

        </View>
    );
}
const styles = StyleSheet.create({
    messageContainer: {
        
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderColor: 'grey',
        backgroundColor: '#E0F8FD',
        borderWidth: 1,
        borderRadius: 8,
        
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    message: {
        fontSize: 25,
        marginLeft: 10,
        color: 'black',
    },
    deleteButton: {
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    sendMessageButton: {
        backgroundColor: '#09BC8A',
        padding: 10,
        alignItems: 'center'
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18
    }
});