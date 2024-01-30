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
            navigation.navigate('InviteFriend', { tournamentId });
        } catch (err) {
            console.error(err);
        }

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter tournament name"
                />
                <Button title="Save" onPress={handleSaveName} />
            </View>
        );
    };
}

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
    },
});

    export default NameTournament;