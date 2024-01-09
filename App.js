import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SetUpQuizScreen from './screens/SetUpQuizScreen';
import FriendsScreen from './screens/FriendsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import RankingScreen from './screens/RankingScreen';
import Home from './assets/icons/star.png';
import Play from './assets/icons/play.png'
import Friends from './assets/icons/friends.png'
import Leaderboard from './assets/icons/trophyicon.png'
import Ranking from './assets/icons/ranking.png'

import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
  <NavigationContainer>
  <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;

            switch (route.name) {
              case 'Home':
                icon = <Image source={Home} style={{ width: 20, height: 20 }} />;
                break;
              case 'SetUpQuiz':
                icon = <Image source={Play} style={{ width: 20, height: 20 }} />;
                break;
              case 'Friends':
                icon = <Image source={Friends} style={{ width: 20, height: 20 }} />;
                break;
              case 'Leaderboard':
                icon = <Image source={Leaderboard} style={{ width: 20, height: 20 }} />;
                break;
              case 'Ranking':
                icon = <Image source={Ranking} style={{ width: 20, height: 20 }} />;
                break;
              default:
                icon = <Image source={Home} style={{ width: 20, height: 20 }} />;
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
        <Tab.Screen name="SetUpQuiz" component={SetUpQuizScreen} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Tab.Screen name="Ranking" component={RankingScreen} />
      </Tab.Navigator>

</NavigationContainer>
  );
}



