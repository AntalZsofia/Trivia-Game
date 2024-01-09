// screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen( {navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trivia Game</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log("Sign in pressed")}>
        <Text style={styles.buttonText}>Sign In</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SetUpQuiz')}>
        <Text style={styles.buttonText}>Log In</Text> 
      </TouchableOpacity>
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
  text: {
    fontSize: 40,
    fontFamily: 'Play'
  },
  button: {
    backgroundColor: '#172A3A',
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  }
});