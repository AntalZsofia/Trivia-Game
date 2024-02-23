import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { View, Text, FlatList, Image, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';

export default function FriendsScreen({ navigation }) {
  const { token, userId, loggedInUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  console.log(userId);

  useFocusEffect(
    useCallback(() => {
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
    }, [token, userId])
  );

  const handlePendingRequests = () => {
    navigation.navigate('Pending Requests');
  };

  const handleSearchUser = async () => {
    // search for friend by username
    const fetchsearchUser = async () => {
      const response = await fetch(`http://localhost:3000/friends/findUser?username=${searchInput}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        console.error('Failed to search friend:', await response.text());
        return;
      }
      const data = await response.json();
      setSearchResults(data);

    };
    fetchsearchUser();
  };

  const sendFriendRequest = async (recipientName, receiverId) => {

    console.log('receiver: ', recipientName);
    console.log('sender: ', userId);

    const response = await fetch('http://localhost:3000/friends/send_request', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ senderId: userId, receiverId }),
    });
    if (!response.ok) {
      console.error('Failed to send friend request:', await response.text());
      return;
    }
    const data = await response.json();
    console.log('Friend request sent successfully', data);

    const messageResponse = await fetch('http://localhost:3000/message/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipients: recipientName,
        sender: loggedInUser,
        message: `You have a new friend request from ${loggedInUser}!`,
        tournamentId: null,
      }),
    });
    if (!messageResponse.ok) {
      console.error('Failed to send message:', await messageResponse.text());
      return;
    }
    const messageData = await messageResponse.json();
    console.log('Message sent successfully', messageData);
  }


return (
  <View style={styles.container}>
    <View style={styles.searchUserContainer}>
      <TextInput
        style={styles.searchUserInput}
        placeholder="Search new friends"
        onChangeText={(text) => {
          setSearchInput(text);
          if (text === '') {
            setSearchResults([]);
          }
        }}
        value={searchInput}
      />
      <Pressable
        style={styles.searchUserButton}
        onPress={handleSearchUser}>
        <Text style={styles.searchUserButtonText}>Search</Text>
      </Pressable>
    </View>


    {searchResults.length > 0 && (
      <View style={styles.friendList}>
        <Text style={styles.resultTitle}>Results</Text>
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <Pressable onPress={() => sendFriendRequest(item.username, item._id)}>
              <View style={styles.friendResult}>
                <Image source={require('../assets/avatars/bunny.jpg')} style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 50 }} />
                <Text style={styles.friendName}>{item.username}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    )}

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
            <Image source={require('../assets/avatars/bunny.jpg')} style={{ width: 80, height: 80, marginLeft: 10, borderRadius: 50 }} />
            <Text style={styles.friendName}>{item.username}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchUserContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 40,
  },
  searchUserInput: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 20,
  },
  searchUserButton: {
    width: '25%',
    height: 40,
    backgroundColor: '#09BC8A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchUserButtonText: {
    color: 'white',
    fontSize: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  friendRequestsContainer: {
    marginHorizontal: 20,
    marginTop: 40,

  },
  friendRequestsButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  friendList: {
    marginTop: 40,

  },
  friendResult: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
  },
  friend: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderColor: 'grey',
    backgroundColor: '#E0F8FD',
    borderWidth: 1,
    borderRadius: 8,

  },
  friendName: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
