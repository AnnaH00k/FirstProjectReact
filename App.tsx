import React from 'react';
import { 
  SafeAreaView,
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  useColorScheme, 
  View,
 } from 'react-native';

 //Navigation
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';


 //Screens
 import Home from './src/screens/Home';
 import FlipClock from './src/screens/FlipClock';
 import Settings from './src/screens/Settings';
 import Challenges from './src/screens/Challenges';
 import ChallengeItem from './src/screens/ChallengeItem';
import ChallengeSetting from './src/screens/ChallengeSetting';
 import TaskList from './src/screens/TaskList';
 import Statistics from './src/screens/Statistics';
import FlipClockHeader from './src/screens/FlipClockHeader';
import HomeHeader from './src/screens/HomeHeader';
import ChallengesHeader from './src/screens/ChallengesHeader';


export type RootStackParamList = {
  Home: undefined;
  Challenges: {
    challengeObject: { name: string; description: string; time: string; tasks: any[]; type: string };
    checkedTasks?: any[]; // Make checkedTasks optional
  };
  ChallengeItem: {
    challengeObject: { name: string; description: string; time: string; tasks: any[]; type: string };
    checkedTasks?: any[]; // Make checkedTasks optional
  };
  ChallengeSetting: { challengeObject: { name: string; description: string; time: string; tasks: any[]; type: string };
  checkedTasks?: any[]; // Make checkedTasks optional
 };
  FlipClock: undefined;
  Settings: undefined;
  TaskList: undefined;
  Statistics: undefined;
  
};

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
         name='Home' 
         component={Home} 
         
         options={{
          title: "Challengor",
          header: () => <HomeHeader navigation={navigator} />,
         }}
         />
          <Stack.Screen
         name='FlipClock'
         component={FlipClock}
         options={{
          title: "FlipClock",
          header: () => <FlipClockHeader navigation={navigator} />,
        }}
         />
          <Stack.Screen
         name='Settings'
         component={Settings}
         options={{title: "Settings"
         }}
         />
         <Stack.Screen
         name='Challenges'
         component={Challenges}
         options={{
          title: "Challenges",
          header: () => <ChallengesHeader navigation={navigator} />,
         }}
         />
          <Stack.Screen
         name='ChallengeItem'
         component={ChallengeItem}
         options={{
          title: "ChallengeItem",
          header: () => <ChallengesHeader navigation={navigator} />,
         }}
         />
          <Stack.Screen
         name='ChallengeSetting'
         component={ChallengeSetting}
         options={{
          title: "ChallengeSetting",
          header: () => <ChallengesHeader navigation={navigator} />,
         }}
         />
           <Stack.Screen
         name='Statistics'
          component={Statistics}
          options={{title: "Statistics"
          }}
          />
            <Stack.Screen
         name='TaskList'
          component={TaskList}
          options={{title: "TaskList"
          }}
          />
        
        
         </Stack.Navigator>
         </NavigationContainer>

  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
