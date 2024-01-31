import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';


export default function TournamentsScreen({ route, navigation }) {
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

  return (
    <Text>TournamentsScreen</Text>
  )
}
