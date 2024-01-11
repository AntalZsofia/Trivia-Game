import React, { useEffect, useState } from 'react';
import he from 'he';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const QuizScreen = ({ route }) => {
    const { questions } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);


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
    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        if (questions[currentQuestionIndex].correct_answer === answer) {
            console.log('Correct Answer');
        } else {
            console.log('Wrong Answer');
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.quizContainer}>
                <View style={styles.quizcategoryContainer}>
                    <Text style={styles.title}>Quiz in: </Text>
                    <Text style={styles.categoryAndDiff}>{questions[currentQuestionIndex].category} - {questions[currentQuestionIndex].difficulty}</Text>
                </View>

                <View style={styles.questionContainer}>
                    {questions[currentQuestionIndex] && (
                        <Text style={styles.question}>
                            {he.decode(questions[currentQuestionIndex].question)}
                        </Text>
                    )}
                </View>

                {answers.map((answer, index) => (
                    <TouchableOpacity key={index}
                        style={selectedAnswer === answer ? styles.selectedAnswerContainer : styles.answersContainer}>
                        <Text style={styles.answers}>{he.decode(answer)}</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#46A0F0',
    },
    quizContainer: {
        flex: 1,
        width: '100%',
    },
    quizcategoryContainer: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    questionContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginBottom: 80,
        width: '85%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    categoryAndDiff: {
        fontSize: 18,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        
    },
    question: {
        fontSize: 24,
        marginBottom: 20,
        alignSelf: 'center',
        fontStyle: 'bold'
    },
    answersContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        width: '70%',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    selectedAnswerContainer: {
        backgroundColor: '#ddd'
    },
    answers: {
        fontSize: 20,
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