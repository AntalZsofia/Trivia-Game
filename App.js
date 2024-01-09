import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import HomeScreen from './screens/HomeScreen';

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

  return <HomeScreen />

}
async function loadFonts() {
  await Font.loadAsync({
    'Play': require('./fonts/Play-Bold.ttf')
  });
}


