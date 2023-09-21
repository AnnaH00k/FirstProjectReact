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
 import Challanges from './src/screens/Challanges';
 import GreenScreen from './src/screens/GreenScreen';
 import Promodoro from './src/screens/Promodoro';
 import TaskList from './src/screens/TaskList';
 import Statistics from './src/screens/Statistics';
 import Details from './src/screens/Details';
 import Tasks from './src/screens/Tasks';


export type RootStackParamList = {
  Home: undefined;
  Challanges: undefined;
  GreenScreen: undefined;
  Promodoro: undefined;
  TaskList: undefined;
  Statistics: undefined;
  Details: {productId: string};
  Tasks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
         name='Home' 
         component={Home} 
         options={{title: "Sandy Seconds"
         }}
         />
         <Stack.Screen
         name='Challanges'
         component={Challanges}
         options={{title: "Challanges"
         }}
         />
         <Stack.Screen
         name='GreenScreen'
          component={GreenScreen}
          options={{title: "Green Screen"
          }}
          />
           <Stack.Screen
         name='Promodoro'
          component={Promodoro}
          options={{title: "Promodoro"
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
         <Stack.Screen
         name='Details'
         component={Details}
         options={{title: "Product Details"
         }}
         />
          <Stack.Screen
         name='Tasks'
         component={Tasks}
         options={{title: "Tasks"
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
