import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Login from '../assets/icons/account.png'

const LoginScreen = ({ navigation, dispatch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (username === '' || password === '') {
            alert('Username and password fields are required.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login succesful', data.token);
                navigation.navigate('New Game', {screen: 'New Game'});
            } else {
                console.log('Login failed', data.error);
            }
        } catch (err) {
                console.error(err);
            }
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Image source={Login} style={{ width: 50, height: 50, marginLeft: 10 }} />
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username" />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password" />
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46A0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 0.5,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 10,
        marginRight: 10,
        marginHorizontal: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 30,
        marginBottom: 30,
        marginTop: 16,
        color: '#000',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
        borderRadius: 8,
    },
    buttonLogin: {
        backgroundColor: '#172A3A',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
})
export default LoginScreen;