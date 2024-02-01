import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Play from '../assets/icons/play.png';


export default function TournamentsScreen({ route }) {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('http://localhost:3000/tournament/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          console.log('Tournaments fetched successfully', data);
          console.log(data);
          setTournaments(data);
        } else {
          console.log('Fetching tournaments failed', data.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchTournaments();
  }, []);

  const colors = ['#66FFDA', '#C5FF66', '#FFF066'];
  const getBackgroundColor = (index) => colors[index % colors.length];

  const handleNavigateNewGame = (tournament) => {
    navigation.navigate('MainTab', {
    screen: 'New Game',
    params:  { tournament: tournament }
  });
  }


  return (
    <ScrollView style={styles.container}>
      {tournaments.map((tournament, index) => (
        <View key={tournament._id} style={[styles.tournamentContainer, {backgroundColor: getBackgroundColor(index)}]}>
          <Text style={styles.tournamentName}>{tournament.name}</Text>
          <Text style={styles.tournamentCategory}>Category: {tournament.category}</Text>
          <Text style={styles.tournamentDifficulty}>Difficulty: {tournament.difficulty}</Text>
          <Text style={styles.userCount}>Users: {tournament.users.length}</Text>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between',  }}>
          <Pressable style={styles.button} onPress={() => handleNavigateNewGame(tournament)}>
          
            <Image source={Play} style={{ width: 40, height: 40 }} />
            <Text style={styles.buttonText}>Play</Text>
          
          </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    
  },
  tournamentContainer: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    width: '90%',
    alignSelf: 'center'
  },
  tournamentName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tournamentScore: {
    fontSize: 16,
    marginBottom: 5,
  },
  tournamentCategory: {
    fontSize: 16,
    marginBottom: 5,
  },
  tournamentDifficulty: {
    fontSize: 16,
    marginBottom: 5,
  },
  userCount: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'end'
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
