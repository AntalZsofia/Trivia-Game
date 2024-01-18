import React, { useState, useEffect, useContext } from 'react';
import  { AuthContext } from '../context/AuthContext';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AccountScreen = ({ navigation, dispatch }) => {
    const [avatar, setAvatar] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
const { token } = useContext(AuthContext);
    const avatars = ['bunny.jpg', 'fox.jpg', 'lion.jpg'];

    // const handleAvatarChange = async () => {
    //     if (avatar === null) {
    //         alert('Please select an avatar.');
    //         return;
    //     }
    //     handle avatar change
    // }

    useEffect(() => {
        const fetchUserDetails = async () => {
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
                    //setUserDetails(data);
                } else {
                    console.log('Fetching user details failed', data.error);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchUserDetails();
    }, [token]);


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Account</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
    }
});

export default AccountScreen;