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
 import Home from './screens/Home';
 import Details from './screens/Details';

export type RootStackParamList = {
  Home: undefined;
  Details: {productId: string};
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
         name='Details'
         component={Details}
         options={{title: "Product Details"
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
