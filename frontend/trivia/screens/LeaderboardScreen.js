import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Trophy from '../assets/icons/trophy.png';

export default function LeaderboardScreen() {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch user details:', await response.text());
        return;
      }
      const data = await response.json();
      console.log(data);
      setUser(data);
      fetchFriends(data);
    }
    catch (err) {
      console.error(err);
    }
  }


const fetchFriends = async (user) => {
  try {
    const response = await fetch('http://localhost:3000/friends/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      console.error('Failed to fetch friends:', await response.text());
      return;
    }
    const data = await response.json();
    console.log(data);
    data.push(user);
    data.sort((a, b) => b.totalPoints - a.totalPoints);

    setFriends(data);
  } catch (err) {
    console.error(err);
  }
};
const renderItem = ({ item, index }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.username}</Text>

    <View style={styles.scoreContainer}>
      <Text style={styles.score}>{item.totalPoints}</Text>
    </View>

    <View style={styles.trophyContainer}>
      {index === 0 ?
        <Image source={Trophy} style={{ width: 50, height: 50 }} />
        : <View style={{ width: 50, height: 50 }} ></View>}
    </View>
  </View>
);

return (
  <View style={styles.container}>
    <FlatList
      style={styles.flatList}
      data={friends}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  </View>
);
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space between',
  },
  flatList: {
    marginTop: 40,

  },
  title: {
    fontSize: 32,
    flex: 1,
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    padding: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  score: {
    fontSize: 26,

  },
  trophyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});
