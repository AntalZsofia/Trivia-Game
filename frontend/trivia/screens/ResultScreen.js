import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'react-native';
import Questions from '../assets/icons/layer.png';
import CorrectAnswers from '../assets/icons/checked.png';


const ResultScreen = ({ route }) => {
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
    },
    resultDetailsContainer:{
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 40,
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
        
    }

});
export default ResultScreen;