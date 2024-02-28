import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Plus from '../assets/icons/plus.png';
import Avatar from './Avatar';


const AccountScreen = ({ navigation, route, dispatch }) => {
    const [avatar, setAvatar] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const { token, userId } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);



        const fetchUserDetails = async () => {
            console.log('token before fetch: ', token)
            try {
                const response = await fetch('http://localhost:3000/user/details', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    console.log('User details fetched successfully', data);
                    console.log(data)
                    setUserDetails(data);

                    setAvatar(data.avatar);

                } else {
                    console.log('Fetching user details failed', data.error);
                }
            } catch (err) {
                console.error(err);
            }
        }

        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:3000/message/all', { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setMessages(data);
                } else {
                    console.log('Fetching messages failed', data.error);
                }
            } catch (err) {
                console.error(err);
            }
        }
    useFocusEffect(
        useCallback(() => {
        fetchUserDetails();
        fetchMessages();
    }, [])
    );


const handleMessages = () => {
    navigation.navigate('Notifications');
};


    return (
        <View style={styles.container}>

            <View style={styles.avatarContainer}>
            <Pressable onPress={() => navigation.navigate('Avatar')}>
                {avatar ? 
                    <Avatar name={avatar} style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 50 }} /> :
                    <Avatar name='bunny' style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 50 }} />
                }
            </Pressable>
                <Image source={Plus}style={styles.plusIcon} />
            </View>

            <View style={styles.userContainer}>
                <View style={styles.detailContainer}>
                    <Text style={styles.details}>Username:</Text>
                    <Text style={styles.details}>{userDetails?.username}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.details}>Email:</Text>
                    <Text style={styles.details}>{userDetails?.email}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.details}>Total score:</Text>
                    <Text style={styles.details}>{userDetails?.totalPoints}</Text>
                </View>
                <View style={styles.detailContainer}>
                <Text style={styles.details}>Games played:</Text>
                <Text style={styles.details}>{userDetails?.gamesPlayed}</Text>
                </View>
            
                <View style={styles.detailContainer}>
                <Text style={styles.details}>Friends:</Text>
                <Text style={styles.details}>{userDetails?.Friends.length}</Text>
                </View>
            </View>
            <View style={styles.messagesContainer}>
        <Pressable onPress={handleMessages}>
          <Text style={styles.messagesText}>Notifications ({messages.length})</Text>
        </Pressable>
      </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
    },
    avatarContainer:{
        marginTop: 20,
        position: 'relative',
        marginLeft: 10,
    },
    plusIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 25,
        height: 25,
        borderRadius: 50,
    },
    userContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        marginTop: 20,
        marginBottom: 50,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#E0F8FD',
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    details: {
        fontSize: 20,
        color: '#000000',
        marginBottom: 10,
    },
    messagesContainer: {
        marginHorizontal: 20,
        marginTop: 20,
       padding: 5,
    
      },
      messagesText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
});

export default AccountScreen;