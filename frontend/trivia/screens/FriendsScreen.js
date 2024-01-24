import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, FlatList, Image, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';

export default function FriendsScreen( {navigation}) {
  const { token } = useContext(AuthContext);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {

        const response = await fetch(`http://localhost:3000/friends/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Friends fetched successfully', data);
          setFriends(data);
        } else {
          console.log('Fetching friends failed', data.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchFriends();
  }, [token]);

  const handlePendingRequests = () => {
    navigation.navigate('Pending Requests');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchFriendsContainer}>
        <TextInput style={styles.searchFriendsInput} placeholder="Search for friends" />
        <Pressable style={styles.searchFriendsButton}>
          <Text style={styles.searchFriendsButtonText}>Search</Text>
        </Pressable>
      </View>

      <View style={styles.friendRequestsContainer}>
        <Pressable onPress={handlePendingRequests}>
          <Text style={styles.friendRequestsButtonText}>Pending requests</Text>
        </Pressable>
      </View>

      <View style={styles.friendList}>
        <Text style={{ fontSize: 20, marginLeft: 20, marginBottom: 10 }}>My friends</Text>
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <View style={styles.friend}>
              <Text style={styles.friendName}>{item.username}</Text>
              <Image source={require('../assets/avatars/bunny.jpg')} style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 50 }} />
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchFriendsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 40,
  },
  searchFriendsInput: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingLeft: 10,
  },
  searchFriendsButton: {
    width: '25%',
    height: 40,
    backgroundColor: '#172A3A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  searchFriendsButtonText: {
    color: 'white',
    fontSize: 15,
  },
  friendRequestsContainer: {
    marginHorizontal: 20,
    marginTop: 40,

  },
  // friendRequestsButton: {
  //   width: '100%',
  //   height: 40,
  //   backgroundColor: '#172A3A',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  // },
  friendRequestsButtonText: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'bold'
  },

  friendList: {
    marginTop: 20,
  },

  friend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  friendName: {
    fontSize: 20,
  },
});
