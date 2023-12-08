import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type FlipClockProps = NativeStackScreenProps<RootStackParamList, 'FlipClock'>;

const FlipClock = ({ route }: FlipClockProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}> 
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Box 1 */}
        <View style={styles.box}>
          <Image source={require('./images/0.png')} style={styles.image} />
          <Image source={require('./images/0.png')} style={styles.image} />
          <Image source={require('./images/0.png')} style={styles.image} />
        </View>

        {/* Box 2 */}
        <View style={styles.box1}>
        <Image source={require('./images/0.png')} style={styles.image} />
        <Image source={require('./images/0.png')} style={styles.image} />
        </View>

        {/* Box 3 */}
        <View style={styles.box2}>
        <Image source={require('./images/0.png')} style={styles.image} />
        <Image source={require('./images/0.png')} style={styles.image} />
        </View>
      </View>
    </View>
  );
};

export default FlipClock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    marginTop: 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 300,
    height: 150,
    marginBottom: 16,
    backgroundColor: 'black', // Adjust as needed
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    objectFit: 'contain',
  },
  box1: {
    width: 200,
    height: 150,
    marginBottom: 16,
    backgroundColor: 'black', // Adjust as needed
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    objectFit: 'contain',
  },
  box2: {
    width: 150,
    height: 150,
    marginBottom: 16,
    backgroundColor: 'black', // Adjust as needed
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    objectFit: 'contain',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
