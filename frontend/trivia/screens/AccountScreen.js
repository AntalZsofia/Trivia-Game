import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AccountScreen = ({ navigation, dispatch }) => {
    const [avatar, setAvatar] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const { token, userId } = useContext(AuthContext);
    const avatars = ['bunny.jpg', 'fox.jpg', 'lion.jpg'];


useFocusEffect(
    useCallback(() => {
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
                } else {
                    console.log('Fetching user details failed', data.error);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchUserDetails();
    }, [token])
);


    return (
        <View style={styles.container}>

            <View style={styles.avatarContainer}>
            <Image source={require('../assets/avatars/bunny.jpg')} style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 50 }} />
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
                <Text style={styles.details}>Tournaments:</Text>
                <Text style={styles.details}>{userDetails?.Tournaments.length}</Text>
                </View>
                <View style={styles.detailContainer}>
                <Text style={styles.details}>Friends:</Text>
                <Text style={styles.details}>{userDetails?.Friends.length}</Text>
                </View>
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
    },
    userContainer: {
        height: 500,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        marginTop: 20,
        marginBottom: 50,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
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
});

export default AccountScreen;