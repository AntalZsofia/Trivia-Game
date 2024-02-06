import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Play from '../assets/icons/play.png';


export default function TournamentsScreen({ route }) {
  const navigation = useNavigation();
  const { token, } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [showMyTournaments, setShowMyTournaments] = useState(true);
  
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const user = await response.json();
        console.log(user);
        return user;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const fetchTournaments = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Tournaments fetched successfully', data);
        setTournaments(data);
      } else {
        console.log('Fetching tournaments failed', data.error);
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const url = showMyTournaments ? 'http://localhost:3000/tournament/user' : 'http://localhost:3000/tournament/friends';
    fetchTournaments(url);
    
    const unsubscribe = navigation.addListener('focus', () => fetchTournaments(url));
  return unsubscribe;
  }, [showMyTournaments, navigation]);

  const colors = ['#66FFDA', '#C5FF66', '#FFF066'];
  const getBackgroundColor = (index) => colors[index % colors.length];

  const handleNavigateNewGame = (tournament) => {
    navigation.navigate('MainTab', {
    screen: 'QuizScreen',
    params:  { tournament: tournament }
  });
  }


  return (
    <ScrollView style={styles.container}>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonTournament} 
        onPress={() => setShowMyTournaments(true)}
        color={showMyTournaments ? 'blue' : 'white'}>
          <Text style={styles.buttonText}>Own</Text>
        </Pressable>
        <Pressable style={styles.buttonTournament} onPress={() => setShowMyTournaments(false)}>
          <Text style={styles.buttonText}>Friends</Text>
        </Pressable>
      </View>

      {tournaments.map((tournament, index) => (
        <View key={tournament._id} style={[styles.tournamentContainer, {backgroundColor: getBackgroundColor(index)}]}>
          <Text style={styles.tournamentName}>{tournament.name} by {tournament.creator}</Text>
          <Text style={styles.tournamentCategory}>Category: {tournament.category}</Text>
          <Text style={styles.tournamentDifficulty}>Difficulty: {tournament.difficulty}</Text>
          <Text style={styles.userCount}>Users: {tournament.users.length}</Text>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between',  }}>
          <Pressable style={styles.button} onPress={() => handleNavigateNewGame(tournament)}>
          
            <Image source={Play} style={{ width: 40, height: 40 }} />
            <Text style={styles.buttonText}>Invite</Text>
          
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonTournament: {
    padding: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
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
