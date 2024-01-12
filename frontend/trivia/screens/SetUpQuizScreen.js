import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import categories from '../data/categories';

const SetUpQuizScreen = ({ navigation }) => {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [amount, setAmount] = useState(1);

    const difficulties = ["Choose a difficulty", "easy", "medium", "hard"];
    const amounts = Array.from({length: 51}, (_, i) => i);
    
    const handleStartQuiz = async () => {
        try{
            const categoryId = categories[category];

            const response = await fetch(`http://localhost:3000/quiz?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`)
            const data = await response.json();
            console.log(data);
            navigation.navigate('QuizScreen', { questions: data.results });
        }catch(err){
            console.error('Error:', err);
        }   
    };

    const handleRandomPlay = async () => {
        try{
            const response = await fetch('http://localhost:3000/surprise');
            const data = await response.json();
            console.log(data);
            navigation.navigate('QuizScreen', { questions: data.results });
        }
        catch(err){
            console.error('Error:', err);
        }

    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>New Game</Text>
            <Text style={styles.label}>Category:</Text>
            <Picker 
            style={styles.picker}
            selectedValue={category} 
            onValueChange={setCategory}>
                {Object.keys(categories).map((categoryName, index) => (
                    <Picker.Item key={index} label={categoryName} value={categoryName} />
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
                <Text style={styles.label}>Amount:</Text>
            <Picker
            style={styles.picker}
            selectedValue={amount}
            onValueChange={setAmount}>
                {amounts.map((amount, index) => (
                    <Picker.Item key={index} label={amount.toString()} value={amount} />
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