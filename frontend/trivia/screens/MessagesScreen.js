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
    const handlePressMessage = (item) => {
        console.log(item);
        if(item.Type === 'InviteTournament') {
            navigation.navigate('New Quiz', { tournamentId: item.Data });
        }
        else if (item.Type === 'FriendRequest') {
            
            navigation.navigate('Pending Requests');
        }
        else if(item.Type === 'JoinTournament'){

            navigation.navigate('All Results', { tournamentId: item.Data.tournamentId });
        }
        else if(item.Type === 'FriendRequestAccepted') {
            navigation.navigate('Friends');
        }
        deleteMessage(item._id);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.message}
                             onPress={() => handlePressMessage(item)}>
                                {item.Message}</Text>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    message: {
        fontSize: 22,
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