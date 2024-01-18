import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import AccountScreen from './screens/AccountScreen';
import SetUpQuizScreen from './screens/SetUpQuizScreen';
import FriendsScreen from './screens/FriendsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
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
    </Stack.Navigator>
  );
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
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="New Game" component={SetUpQuizStack} options={{ headerShown: false }} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Tab.Screen name="Tournament" component={TournamentsScreen} />
      </Tab.Navigator>
  );

}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        {isLoggedIn ? <MainTab /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
