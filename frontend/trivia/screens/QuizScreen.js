import React, { useEffect, useState } from 'react';
import he from 'he';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const QuizScreen = ({ route }) => {
    const { questions } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);


    useEffect(() => {
        if (questions[currentQuestionIndex]) {
            const allAnswers = [
                questions[currentQuestionIndex].correct_answer,
                ...questions[currentQuestionIndex].incorrect_answers
            ];
            setAnswers(shuffleArray(allAnswers));
        }
    }, [currentQuestionIndex]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
        <View style={styles.container}>
            <View style={styles.quizContainer}>
                <Text style={styles.title}>Quiz</Text>
                <View style={styles.questionContainer}>
                    {questions[currentQuestionIndex] && (
                        <Text style={styles.question}>
                            {he.decode(questions[currentQuestionIndex].question)}
                        </Text>
                    )}
                </View>
                {answers.map((answer, index) => (
                    <View key={index} style={styles.answersContainer}>
                        <Text style={styles.answers}>{he.decode(answer)}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46A0F0'
    },
    quizContainer: {
        flex: 1,
        alignItems: 'center',

    },
    questionContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginBottom: 80,
        width: '90%',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    question: {
        fontSize: 20,
        marginBottom: 20,
        alignSelf: 'center',
        fontStyle: 'bold'
    },
    answersContainer: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 8,
        marginBottom: 20,
        width: '90%',
        justifyContent: 'center',
    },
    answers: {
        fontSize: 16,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    nextButton: {
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
    nextButtonText: {
        color: '#fff',
        fontSize: 20,
        fontStyle: 'bold',
        alignSelf: 'center'
    },
});

export default QuizScreen;