import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import AccountScreen from './screens/AccountScreen';
import SetUpQuizScreen from './screens/SetUpQuizScreen';
import FriendsScreen from './screens/FriendsScreen';
import PendingRequestsScreen from './screens/PendingRequestsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import NameTournament from './screens/NameTournament';
import TournamentsScreen from './screens/TournamentsScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import Home from './assets/icons/account.png';
import Play from './assets/icons/play.png'
import Friends from './assets/icons/friends.png'
import Leaderboard from './assets/icons/trophyicon.png'
import Tournament from './assets/icons/ranking.png'
import { AuthContext } from './context/AuthContext';
import { Image } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';


// Notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


//Stacks and Tabs

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


function SetUpQuizStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="New Game"
        component={SetUpQuizScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 25,
            color: 'black',
            marginTop: 10,
          },
          headerStyle: {
            height: 80,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }
        }}
      />
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} />
      <Stack.Screen name= "NameTournament" component={NameTournament} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function FriendsStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Friends" component={FriendsScreen} 
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 25,
            color: 'black',
            marginTop: 10,
          },
          headerStyle: {
            height: 80,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }
        }} 
      />
      <Stack.Screen name="Pending Requests" component={PendingRequestsScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 25,
          color: 'black',
          marginTop: 10,
        },
        headerStyle: {
          height: 80,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }
      }}  />
    </Stack.Navigator>
  )
}
function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
    case 'QuizScreen':
    case 'ResultScreen':
      return false;
    default:
      return true;
  }
}

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;

          switch (route.name) {
            case 'Account':
              icon = <Image source={Home} style={{ width: 30, height: 30 }} />;
              break;
            case 'New Game':
              icon = <Image source={Play} style={{ width: 30, height: 30 }} />;
              break;
            case 'Friends':
              icon = <Image source={Friends} style={{ width: 30, height: 30 }} />;
              break;
            case 'Leaderboard':
              icon = <Image source={Leaderboard} style={{ width: 30, height: 30 }} />;
              break;
            case 'Tournament':
              icon = <Image source={Tournament} style={{ width: 30, height: 30 }} />;
              break;
            default:
              icon = <Image source={Home} style={{ width: 30, height: 30 }} />;
              break;
          }
          return icon;
        },
        tabBarVisible: getTabBarVisibility(route),
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
      <Tab.Screen name="Account" component={AccountScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 25,
            color: 'black',
            marginTop: 10,
          },
          headerStyle: {
            height: 80,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }
        }} />
      <Tab.Screen name="Friends" component={FriendsStack} options={{ headerShown: false }}/>
      <Tab.Screen name="New Game" component={SetUpQuizStack} options={{ headerShown: false }} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Tournament" component={TournamentsScreen} 
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 25,
          color: 'black',
          marginTop: 10,
        },
        headerStyle: {
          height: 80,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }
      }} />
    </Tab.Navigator>
  );

}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);

      // Save the token to your backend
      fetch('http://localhost:3000/token/save_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          userId: userId,
        }),
      });
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return() => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, userId, setUserId }}>
      <NavigationContainer>
        {isLoggedIn ? <MainTab /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
