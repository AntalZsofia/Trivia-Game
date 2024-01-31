import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Register from '../assets/icons/account.png';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation, dispatch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { setIsLoggedIn, setToken, setUserId } = useContext(AuthContext);


    const handleRegister = async () => {
        if (username === '' || password === '' || email === '') {
            alert('Username, password and email fields are required.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password}),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Register successful', data.token);
                setIsLoggedIn(true);
                setToken(data.token);
                setUserId(data.userId);
            } else {
                console.log('Register failed', data.error);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.regContainer}>
                <Image source={Register} style={{ width: 50, height: 50, marginLeft: 10 }} />
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username" />
                    <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email" />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password" />

                <TouchableOpacity
                    style={styles.buttonReg}
                    onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46A0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    regContainer: {
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
        fontSize: 20,
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
        borderRadius: 8,
    },
    buttonReg: {
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
export default RegisterScreen;