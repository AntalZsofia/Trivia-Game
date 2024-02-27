import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Avatar from "./Avatar";


const avatarImages = {
    'bunny': require("../assets/avatars/bunny.jpg"),
    'fox': require("../assets/avatars/fox.jpg"),
    'lion': require("../assets/avatars/lion.jpg"),
    'coala': require("../assets/avatars/coala.jpg"),
    'dog': require("../assets/avatars/dog.jpg"),
    'tiger': require("../assets/avatars/tiger.jpg"),
};




export default function AvatarScreen({ navigation, dispatch }) {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedBorder, setSelectedBorder] = useState(null);
    const { token, userId } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);

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
                setSelectedAvatar(avatarImages[data.avatar]);
                console.log(data.avatar);
            } else {
                console.log('Fetching user details failed', data.error);
            }
        } catch (err) {
            console.error(err);
        }
    }
    const updateUserDetails = async () => {
        const avatarName = Object.keys(avatarImages).find(name => avatarImages[name] === selectedAvatar);
        try {
            const response = await fetch('http://localhost:3000/user/avatar/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    avatar: avatarName,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('User details updated successfully', data);
                setUserDetails(data);
                setSelectedAvatar(avatarImages[data.avatar]);

                navigation.navigate('Account');
            } else {
                console.log('Updating user details failed', data.error);
            }
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                {selectedAvatar ? (
                    <>
                        <Image source={selectedAvatar} style={styles.avatarPreview} />
                    </>
                ) : null}
            </View>
            <Text style={styles.changeAvatarText}>Change Avatar</Text>
            <View style={styles.avatarsContainer}>
                {Object.entries(avatarImages).map(([avatarName, avatarImage], index) => (
                    <Pressable key={index} onPress={() => 
                    setSelectedAvatar(avatarImage)} style={[styles.avatar, { borderColor: selectedAvatar === avatarImage ? 'black' : 'transparent', borderWidth: selectedAvatar === avatarImage ? 2 : 0 }]}>
                        <Image source={avatarImage} style={styles.avatar} />
                    </Pressable>
                ))}
            </View>

            
            <Pressable onPress={updateUserDetails} style={styles.saveChangesButton}>
                <Text style={styles.saveChangesText}> Save Changes </Text>
            </Pressable>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    avatarContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    avatarPreview: {
        width: 80,
        height: 80,
        marginLeft: 10,
        borderRadius: 50
    },
    avatarsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    changeAvatarButton: {
        marginTop: 10,
    },
    changeAvatarText: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
    },
    userDetailsContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    saveChangesButton: {
        backgroundColor: '#09BC8A',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        right: 10
    },
    saveChangesText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
});
