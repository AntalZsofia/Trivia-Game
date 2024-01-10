import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

const SetUpQuizScreen = ({ navigation }) => {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const categories = ["General Knowledge", "Entertainment: Books", "Entertainment: Films"];
    const difficulties = ["Easy", "Medium", "Hard"];

    const handleStartQuiz = () => {
        // Logic to start the quiz
    };

    const handleRandomPlay = () => {
        // Logic to cancel the quiz setup

    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>New Game</Text>
            <Text style={styles.label}>Category:</Text>
            <Picker 
            style={styles.picker}
            selectedValue={category} 
            onValueChange={setCategory}>
                {categories.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                ))}
            </Picker>           
             <Text style={styles.label}>Difficulty:</Text>
            <Picker
            style={styles.picker}
            selectedValue={difficulty}
            onValueChange={setDifficulty}>
                {difficulties.map((difficulty, index) => (
                    <Picker.Item key={index} label={difficulty} value={difficulty} />
                ))} 
                </Picker>
            <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
                <Text style={styles.startButtonText}>Start Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.randomPlayButton} onPress={handleRandomPlay}>
                <Text style={styles.randomPlayButtonText}>Surprise Me!</Text>
            </TouchableOpacity>
            <Text style={styles.additionalInfo}>Quiz stars with a random category and difficulty</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center'
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    picker: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    startButton: {
        backgroundColor: '#09BC8A',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8
    },
    startButtonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    },
    randomPlayButton: {
        backgroundColor: '#09BC8A',
        marginTop: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 8
    },
    randomPlayButtonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    },
    additionalInfo: {
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 10,
        color: '#777575',
    }
});

export default SetUpQuizScreen;