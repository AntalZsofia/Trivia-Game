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
    }, [token]);


    return(
        <View style={styles.container}>
                <Text style={styles.details}>{userDetails?.avatar}</Text>
            <View style={styles.userContainer}>
                <Image source={{ uri: `http://localhost:3000/uploads/${avatar}` }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                <Text style={styles.details}>Username: {userDetails?.username}</Text>
                <Text style={styles.details}>Email: {userDetails?.email}</Text>
                <Text style={styles.details}>Highscore: {userDetails?.highscore}</Text>
                <Text style={styles.details}>Total score: {userDetails?.totalScore}</Text>
                <Text style={styles.details}>Total games played: {userDetails?.totalGamesPlayed}</Text>
                <Text style={styles.details}>Tournaments: {userDetails?.Tournaments.length}</Text>
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
    details: {
        fontSize: 20,
        justifyContent: 'flex-start',
        color: '#000000',
        marginBottom: 10,
        marginTop: 10,
    },
});

export default AccountScreen;