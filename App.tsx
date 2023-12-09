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
 import Challanges from './src/screens/Challanges';
 import TaskList from './src/screens/TaskList';
 import Statistics from './src/screens/Statistics';
import FlipClockHeader from './src/screens/FlipClockHeader';
import HomeHeader from './src/screens/HomeHeader';


export type RootStackParamList = {
  Home: undefined;
  Challanges: undefined;
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
         name='Challanges'
         component={Challanges}
         options={{title: "Challanges"
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
