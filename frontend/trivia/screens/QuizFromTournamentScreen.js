import React, { useEffect, useState, useContext } from 'react';
import he from 'he';
import { AuthContext } from '../context/AuthContext';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const QuizFromTournamentScreen = ({ navigation, route }) => {
    
    
    const tournamentId = route.params.tournamentId;
   const { token } = useContext(AuthContext);
    const [tournament, setTournament] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showAnswerResult, setShowAnswerResult] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [points, setPoints] = useState(0);
    


    useEffect(() => {
        
        getTournamentById(tournamentId).then(tournamentData => {
            setTournament(tournamentData);
        });
    }, [tournamentId]);

    useEffect(() => {
        if (tournament && tournament.questions[currentQuestionIndex]) {
            const allAnswers = [
                tournament.questions[currentQuestionIndex].correct_answer,
                ...tournament.questions[currentQuestionIndex].incorrect_answers
            ];
            setAnswers(shuffleArray(allAnswers));
        }
    }, [currentQuestionIndex, tournament]);



const getTournamentById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/tournament/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
        const data = await response.json();
        if (response.ok) {
            console.log('Tournament fetched successfully', data);
            setTournament(data);
            setQuestions(data.questions);
            setCategory(data.questions[0].category);
            setDifficulty(data.questions[0].difficulty);

            const allAnswers = [
                data.questions[0].correct_answer,
                ...data.questions[0].incorrect_answers
            ];
            setAnswers(shuffleArray(allAnswers));

        } else {
            console.log('Fetching tournament failed', data.error);
        }
    } catch (err) {
        console.error(err);
    }
};



const handleNextQuestion = () => {
        console.log('click');
        if (currentQuestionIndex < questions.length - 1) {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setShowAnswerResult(false);

            const allAnswers = [
                questions[nextQuestionIndex].correct_answer,
                ...questions[nextQuestionIndex].incorrect_answers
            ];
            setAnswers(shuffleArray(allAnswers));
        } else {
            console.log('End of Quiz');

            navigation.navigate('ResultAfterTournament', { 
                tournamentId: tournamentId,
                totalQuestions: questions.length, 
                correctAnswers: correctAnswers, 
                category: category, 
                difficulty: difficulty,
                questions: questions.map(question => ({
                    category: question.category,
                    difficulty: question.difficulty,
                    question: question.question,
                    correctAnswer: question.correct_answer,
                    incorrectAnswers: question.incorrect_answers,
                })),
                points: points, 
            });
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
        setIsAnswered(true);

        if (questions[currentQuestionIndex].correct_answer === answer) {
            console.log('Correct Answer');
            setIsCorrect(true);
            setCorrectAnswers(correctAnswers + 1);

            switch(questions[currentQuestionIndex].difficulty){
                case 'easy':
                    setPoints(points + 1);
                    break;
                case 'medium':
                    setPoints(points + 2);
                    break;
                case 'hard':
                    setPoints(points + 3);
                    break;
                default:
                    break;
            }
        } else {
            console.log('Wrong Answer');
            setIsCorrect(false);
        }
        setShowAnswerResult(true);

    }

    return (
        <View style={styles.container}>
        <View style={styles.quizContainer}>
            <View style={styles.counterContainer}>
            <Text style={styles.counter}>{currentQuestionIndex + 1} / {questions.length}</Text>
            </View>
            <View style={styles.quizcategoryContainer}>
                <Text style={styles.title}>Quiz in: </Text>
                <Text style={styles.categoryAndDiff}>{category} - {difficulty}</Text>
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
                    style={[
                        styles.answersContainer,
                        selectedAnswer === answer && showAnswerResult ? (isCorrect ? styles.correctAnswerContainer : styles.wrongAnswerContainer) : null,
                        showAnswerResult && answer === questions[currentQuestionIndex].correct_answer ? styles.correctAnswerContainer : null,
                    ]}
                    onPress={() => handleAnswer(answer)}
                    disabled={showAnswerResult}

                >
                    <Text style={styles.answers}>{he.decode(answer)}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <Pressable
            style={styles.nextButton}
            onPress={handleNextQuestion}
            disabled={!isAnswered}
        >
            <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>


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
counterContainer: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    marginLeft: 20,
    marginTop: 20,
    padding: 5,
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
counter:{
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
    borderWidth: 4,
    borderColor: 'green',
},
correctAnswerContainer: {
    backgroundColor: '#69F03C',
},
wrongAnswerContainer: {
    backgroundColor: '#FF3333',
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


export default QuizFromTournamentScreen;
