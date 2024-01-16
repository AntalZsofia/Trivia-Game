// screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Title from '../assets/icons/title.jpg';


export default function HomeScreen( {navigation}) {
 
  return (
    <View style={styles.container}>
      <Image source={Title} style={{ width: 400, height: 400 }} resizeMode="contain" />
      <TouchableOpacity style={styles.button} onPress={() => console.log("Sign in pressed")}>
        <Text style={styles.buttonText}>Sign In</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
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