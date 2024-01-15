import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SetUpQuizScreen from './screens/SetUpQuizScreen';
import FriendsScreen from './screens/FriendsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import RankingScreen from './screens/RankingScreen';
import QuizScreen from './screens/QuizScreen';
import Home from './assets/icons/star.png';
import Play from './assets/icons/play.png'
import Friends from './assets/icons/friends.png'
import Leaderboard from './assets/icons/trophyicon.png'
import Ranking from './assets/icons/ranking.png'

import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SetUpQuizStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="SetUpQuiz" component={SetUpQuizScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
  <NavigationContainer>
  <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;

            switch (route.name) {
              case 'Home':
                icon = <Image source={Home} style={{ width: 30, height: 30 }} />;
                break;
              case 'Quiz':
                icon = <Image source={Play} style={{ width: 30, height: 30 }} />;
                break;
              case 'Friends':
                icon = <Image source={Friends} style={{ width: 30, height: 30 }} />;
                break;
              case 'Leaderboard':
                icon = <Image source={Leaderboard} style={{ width: 30, height: 30 }} />;
                break;
              case 'Ranking':
                icon = <Image source={Ranking} style={{ width: 30, height: 30}} />;
                break;
              default:
                icon = <Image source={Home} style={{ width: 30, height: 30 }} />;
                break;
            }
            return icon;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Quiz" component={SetUpQuizStack} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Tab.Screen name="Ranking" component={RankingScreen} />
      </Tab.Navigator>
</NavigationContainer>
  );
}



