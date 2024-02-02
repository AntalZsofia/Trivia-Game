import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Accept from '../assets/icons/accept.png';
import Decline from '../assets/icons/decline.png';

export default function PendingRequestsScreen({ navigation }) {
    const { token, userId } = useContext(AuthContext);
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);

    const fetchSentRequests = async () => {
        try{
          const response = await fetch(`http://localhost:3000/friends/requests/sent/${userId}`, {
            method: 'GET',
            headers: {  
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
              },
              });
              const data = await response.json();
              if(response.ok){
                console.log('Friend requests fetched successfully', data);
                setSentRequests(data);
              }
              else{
                console.log('Fetching friend requests failed', data.error);
              }
        }
        catch(err){
            console.error(err);
        } 
    }
    
    const fetchReceivedRequests = async () => {
      try{
        const response = await fetch(`http://localhost:3000/friends/requests/received/${userId}`, {
          method: 'GET',
          headers: {  
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        if(response.ok){
          console.log('Friend requests fetched successfully', data);
          setReceivedRequests(data);
        }
        else{
          console.log('Fetching friend requests failed', data.error);
        } 
      }
      catch(err){
        console.error(err);
      }
    }
      
      const handleAccept = async (id) => {
        const response = await fetch(`http://localhost:3000/friends/acceptRequest`, {
           method: 'POST',
           headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({
            senderId: id,
            receiverId: userId,
           }),
        });
        if(response.ok){
            console.log('Friend request accepted successfully');
            fetchSentRequests();
            fetchReceivedRequests();
            setReceivedRequests(receivedRequests.filter(request => request._id !== id));
  
        }
        else{
            const data = await response.json();
            console.log('Friend request acceptance failed', data.error);
        }
    };

    const handleDecline = async (id) => {
      const response = await fetch(`http://localhost:3000/friends/declineRequest`, {
           method: 'POST',
           headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({
            senderId: id,
            receiverId: userId,
           }),
        });
        if(response.ok){
            console.log('Friend request declined successfully');
            
        }
        else{
            const data = await response.json();
            console.log('Friend request decline failed', data.error);
        }
    };

    useFocusEffect(
      useCallback(() => {
        const fetchRequests = async () => {
          await fetchSentRequests();
          await fetchReceivedRequests();
        };
        fetchRequests();
      }, [token])
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sent Requests</Text>
        <FlatList
          data={sentRequests}
          renderItem={({ item }) => (
            <View style={styles.request}>
              <Text style={styles.requestText}>You sent a friend request to {item.username}!</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => handleDecline(item._id)}
                >
                  <Image source={Decline} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        <Text style={styles.title}>Received Requests</Text>
        <FlatList
          data={receivedRequests}
          renderItem={({ item }) => (
            <View style={styles.request}>
              <Text style={styles.requestText}>{item.username} wants to be your friend!</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAccept(item._id)}
                >
                  <Image source={Accept} style={{ width: 30, height: 30 }} />
                  
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => handleDecline(item._id)}
                >
                  <Image source={Decline} style={{ width: 30, height: 30 }} />
                 
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    );


};

const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    request: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'grey',
        width: '100%'
    },
    requestText: {
        fontSize: 20,
        color: 'black'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '30%'
    },
    declineButton: {
        marginLeft: 10,
    },
    buttonText: {
        color: 'white'
    }
});
