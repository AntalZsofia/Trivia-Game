import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function PendingRequestsScreen({ navigation }) {
    const { token, userId } = useContext(AuthContext);
    console.log(token);
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try{
          const response = await fetch('http://localhost:3000/friends/requests', {
            method: 'GET',
            headers: {  
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
              },
              });
              const data = await response.json();
              if(response.ok){
                console.log('Friend requests fetched successfully', data);
                setRequests(data);
              }
              else{
                console.log('Fetching friend requests failed', data.error);
              }
        }
        catch(err){
            console.error(err);
        } 
    }
    useEffect (() => {
        fetchRequests();
    }, [token]);


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
            fetchRequests();
        }
        else{
            const data = await response.json();
            console.log('Friend request acceptance failed', data.error);
        }
    };

    const handleDecline = async (id) => {
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
            fetchRequests();
        }
        else{
            const data = await response.json();
            console.log('Friend request acceptance failed', data.error);
        }
    };

    return (
        <View style={styles.container}>
          <FlatList
            data={requests}
            renderItem={({ item }) => (
              <View style={styles.request}>
                <Text style={styles.requestText}>{item.username} wants to be your friend!</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAccept(item._id)}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => handleDecline(item._id)}
                  >
                    <Text style={styles.buttonText}>Decline</Text>
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
        width: '30%'
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
});
