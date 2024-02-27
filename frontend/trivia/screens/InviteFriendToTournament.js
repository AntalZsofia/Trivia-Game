import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Avatar from './Avatar';

const InviteFriendToTournament = ({ route }) => {
  const tournament = route.params.tournament;
  console.log(tournament);
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const { token, loggedInUser } = useContext(AuthContext);

  useEffect(() => {

    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3000/friends/nonparticipants/${tournament._id}`, {
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
  };

  const toggleFriendSelection = (friendId) => {
    // Toggle friend's selection status
    setSelectedFriends(prevSelectedFriends => {
      if (prevSelectedFriends.includes(friendId)) {
        return prevSelectedFriends.filter(id => id !== friendId);
      } else {
        return [...prevSelectedFriends, friendId];
      }
    });
  };

  const renderFriendItem = ({ item }) => {
    const isSelected = selectedFriends.includes(item._id);

    return (
      <TouchableOpacity
        style={[styles.friendContainer, { borderWidth: isSelected ? 3 : 1 }]}
        onPress={() => toggleFriendSelection(item._id)}
      >
        <Avatar name={item.avatar} style={styles.avatar} />
        <Text style={styles.friend}>{item.username}</Text>

      </TouchableOpacity>
    );
  };

  const handleInvitePress = () => {
    const username = loggedInUser;
    const tournamentId = tournament._id;
    console.log(tournamentId);
    const message = `You have a new invitation to join a tournament in:
     category: ${tournament.category}
     difficulty: ${tournament.difficulty} 
     by ${username}`;

    const recipientUsernames = selectedFriends.map(friendId => {
      const friend = friends.find(f => f._id === friendId);
      return friend ? friend.username : null;
    });

    fetch('http://localhost:3000/message/send', {
      method: 'POST',
      body: JSON.stringify({
        sender: loggedInUser,
        recipients: recipientUsernames,
        message: message,
        type: 'InviteTournament',
        data: tournamentId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Handle response from the API
        console.log(data);
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <FlatList
          data={friends}
          style={styles.flatListFriends}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item._id.toString()}
        />
        <TouchableOpacity
          style={styles.inviteButton}
          onPress={handleInvitePress}
        >
          <Text style={styles.inviteButtonText}>Invite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  flatListFriends: {
    marginTop: 30,
    flex: 1,
    width: '100%',
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#E0F8FD',
  },
  friend: {
    flex: 1,
    color: 'black',
    fontSize: 30,

  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 20,
  },

  tick: {
    color: 'black',
  },
  inviteButton: {
    backgroundColor: '#09BC8A',
    marginTop: 20,
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    left: 0,
    right: 0,
    alignSelf: 'center',
  },
  inviteButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  }

});


export default InviteFriendToTournament;
