import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'react-native';
import Questions from '../assets/icons/layer.png';
import CorrectAnswers from '../assets/icons/checked.png';
import Points from '../assets/icons/star.png';
import AllPoints from '../assets/icons/five-stars.png';



const ResultScreen = ({ route, navigation }) => {
    const questions = route.params;

    console.log(questions); 
    return (
        <View style={styles.resultContainer}>
            <View style={styles.quizContainer}>
                <Text style={styles.quizDetails}>You have completed the quiz:</Text>
                <Text style={styles.quizDetailsCategory}>{questions.category}</Text>
                <Text style={styles.quizDetailsDifficulty}>{questions.difficulty}</Text>
            </View>

            <View style={styles.resultsTitleContainer}>
                <Text style={styles.resultsTitle}>Here are your results</Text>
            </View>

            <View style={styles.resultsContainer}>
                <View style={styles.resultDetailsContainer}>
                    <View style={styles.imageAndTextContainer}>
                    <Image source={Questions} style={{ width: 30, height: 30, marginLeft: 10 }} />
                    <Text style={styles.result}>{questions.totalQuestions}</Text>
                    </View>
                    <Text style={styles.resultLabel}>Total Questions</Text>
                </View>

                <View style={styles.resultDetailsContainer}>
                    <View style={styles.imageAndTextContainer}>
                    <Image source={CorrectAnswers} style={{ width: 30, height: 30, marginLeft: 10 }} />
                    <Text style={styles.result}>{questions.correctAnswers}</Text>
                    </View>
                    <Text style={styles.resultLabel}>Correct Answers</Text>
                </View>

                <View style={styles.resultDetailsContainer}>
                    <View style={styles.imageAndTextContainer}>
                    <Image source={Points} style={{ width: 30, height: 30, marginLeft: 10 }} />
                    <Text style={styles.result}>{questions.points}</Text>
                    </View>
                    <Text style={styles.resultLabel}>Points gained</Text>
                </View>

                <View style={styles.resultDetailsContainer}>
                    <View style={styles.imageAndTextContainer}>
                    <Image source={AllPoints} style={{ width: 30, height: 30, marginLeft: 10 }} />
                    <Text style={styles.result}>{questions.points}</Text>
                    </View>
                    <Text style={styles.resultLabel}>Total points</Text>
                </View>

                </View>
<View style={styles.buttonsContainer}>
<Pressable style={styles.buttonTournament} onPress={() => navigation.navigate('TournamentsScreen')}>
        <Text style={styles.buttonText}>Make this a tournament</Text>
    </Pressable>
    <Pressable style={styles.buttonBack} onPress={() => navigation.navigate('New Game')}>
        <Text style={styles.buttonText}>Back</Text>
    </Pressable>
</View>
        </View>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
        backgroundColor: '#46A0F0',
        flex: 1,
    },
    quizContainer: {
        
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginTop: 140,
        marginBottom: 40,
        width: '85%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
    },
    quizDetails: {
        fontSize: 20,
        marginBottom: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
    quizDetailsCategory: {
        fontSize: 24,
        alignSelf: 'center',
    },
    quizDetailsDifficulty: {
        fontSize: 24,
        alignSelf: 'center',
    },
    resultsTitleContainer: {
        alignItems: 'center',
    },
    resultsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    resultsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    resultDetailsContainer:{
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
        width: '41%',
        alignSelf: 'center',
    },
    imageAndTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    result: {
        fontSize: 18,
        marginLeft: 10,
    },
    resultLabel: {
        fontSize: 18,
        marginTop: 7,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    buttonBack: {
        backgroundColor: '#09BC8A',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8
    },
    buttonTournament: {
        backgroundColor: '#09BC8A',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    }

});
export default ResultScreen;