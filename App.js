import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import HomeScreen from './screens/HomeScreen';
import SetUpQuizScreen from './screens/SetUpQuizScreen';

const Stack = createStackNavigator();

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => setFontLoaded(true)}
  //     />
  //   );
  // }

  return (
  <NavigationContainer>
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="SetUpQuiz" component={SetUpQuizScreen} />
  </Stack.Navigator>
</NavigationContainer>
  );
}
async function loadFonts() {
  await Font.loadAsync({
    'Play': require('./fonts/Play-Bold.ttf')
  });
}


