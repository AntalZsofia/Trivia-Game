import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const NameTournament = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const { token } = useContext(AuthContext);
    const { tournamentId } = route.params;

    const handleSaveName = async () => {
        try {
            const response = await fetch('http://localhost:3000/tournament/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, tournamentId }),
            });
            const data = await response.json();
            console.log(data);
            navigation.navigate('Tournament', { tournamentId });
        } catch (err) {
            console.error(err);
        }
    };

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter tournament name"
                />
                <Pressable style={styles.button} onPress={handleSaveName}>
                    <Text style={styles.text}>Save</Text> 
                </Pressable>
                        
            </View>
        );
    };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    button: {
        marginTop: 20,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        backgroundColor: '#09BC8A',
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 12,
        textAlign: 'center',
    }
});

    export default NameTournament;