import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const InviteFriendToTournament = ( ) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const { token, } = useContext(AuthContext);

  useEffect(() => {
    // Fetch user's friends from API
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try{
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
        style={[styles.friendContainer, { borderWidth: isSelected ? 3 : 1}]}
        onPress={() => toggleFriendSelection(item._id)}
      >
        <Text style={styles.friend}>{item.username}</Text>
        
      </TouchableOpacity>
    );
  };

  const handleInvitePress = () => {
    // Send invitation to selected friends
    // Replace the API call with your own implementation
    // Example:
    fetch('/api/invite', {
      method: 'POST',
      body: JSON.stringify(selectedFriends),
      headers: {
        'Content-Type': 'application/json'
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
    fontSize: 20,

  },
  tick: {
    color: 'black',
  },
  inviteButton: {
    backgroundColor: '#09BC8A', 
    padding: 20, 
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  inviteButtonText: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'bold',
  }

});


export default InviteFriendToTournament;
