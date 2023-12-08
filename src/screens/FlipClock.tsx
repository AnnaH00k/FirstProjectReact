import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from 'react-native-elements';

type FlipClockProps = NativeStackScreenProps<RootStackParamList, 'FlipClock'>;

const FlipClock = ({ route }: FlipClockProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const windowDimensions = useWindowDimensions();
  const isBigScreen = windowDimensions.width > 600; // Adjust the threshold as needed

  const [isStarted, setIsStarted] = useState(false);
  const [numberImageIndexTop, setNumberImageIndexTop] = useState(0); // Index for the current image
  const [numberImageIndexBottom, setNumberImageIndexBottom] = useState(0); // Index for the current image
  const [isSeconds, setIsSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const numberImagesTop = [
    require('./images/0Top.png'),
    require('./images/1Top.png'),
    require('./images/2Top.png'),
    require('./images/3Top.png'),
    require('./images/4Top.png'),
    require('./images/5Top.png'),
    require('./images/6Top.png'),
    require('./images/7Top.png'),
    require('./images/8Top.png'),
    require('./images/9Top.png'),
  ];
  const numberImagesBottom = [
    require('./images/0Bottom.png'),
    require('./images/1Bottom.png'),
    require('./images/2Bottom.png'),
    require('./images/3Bottom.png'),
    require('./images/4Bottom.png'),
    require('./images/5Bottom.png'),
    require('./images/6Bottom.png'),
    require('./images/7Bottom.png'),
    require('./images/8Bottom.png'),
    require('./images/9Bottom.png'),
];

   // Function to change the image every second
   useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setNumberImageIndexTop((prevIndex) => (prevIndex + 1) % numberImagesTop.length);
        setNumberImageIndexBottom((prevIndex) => (prevIndex + 1) % numberImagesBottom.length);

      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStarted, numberImagesTop, numberImagesBottom]);

  // Function to handle start click
  const handleStartClick = () => {
    setIsStarted((prevIsStarted) => !prevIsStarted);
  };
  const handleStop = () => {
    setIsStarted(false);
    setNumberImageIndexTop(0);
    setNumberImageIndexBottom(0);
    setTime(0);
  };
  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButtons} onPress={handleStartClick}>
          <Text style={styles.button}>{isStarted ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
          {isStarted &&
            <TouchableOpacity onPress={handleStop}>
              <Text style={[styles.button, { borderWidth: 1 }]}>Stop</Text> 
            </TouchableOpacity>
          }
        <TouchableOpacity onPress={handleSettings}> 
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>



      <View style={[styles.content, isBigScreen && { flexDirection: 'row', gap: 15 }]}>
        {/* Box 1 */}
        <View style={styles.column}>
          <View style={[styles.box, isBigScreen && {width:400, height:300}]}>
            <View style={[styles.numberBox && {width:133, gap: 3, height:300}]}>
              <Image source={require('./images/0Top.png')} style={styles.image} />
              <Image source={require('./images/0Bottom.png')} style={styles.image} />
            </View>
            <View style={[styles.numberBox && {width:133, gap: 3, height:300}]}>
              <Image source={require('./images/0Top.png')} style={styles.image} />
              <Image source={require('./images/0Bottom.png')} style={styles.image} />
            </View>
            <View style={[styles.numberBox && {width:133, gap: 3, height:300}]}>
              <Image source={require('./images/0Top.png')} style={styles.image} />
              <Image source={require('./images/0Bottom.png')} style={styles.image} />
            </View>
          </View>
          <Text style={styles.text}>HOUR</Text>
        </View>

        {/* Box 2 */}
        <View style={styles.column}>
        <View style={[styles.box1, isBigScreen && {width:300, height:300}]}>
        <View style={[styles.numberBox && {width:150, gap: 3, height:300}]}>
                <Image source={require('./images/0Top.png')} style={styles.image} />
                <Image source={require('./images/0Bottom.png')} style={styles.image} />
              </View>
              <View style={[styles.numberBox && {width:150, gap: 3, height:300}]}>
                <Image source={require('./images/0Top.png')} style={styles.image} />
                <Image source={require('./images/0Bottom.png')} style={styles.image} />
              </View>
          </View>
          <Text style={styles.text}>MIN</Text>
        </View>

        {/* Box 3 */}
        <View style={styles.column}>
          <View style={[styles.box2, isBigScreen && { width: 300, height: 300 }]}>
          <View style={[styles.numberBox2 && {width:150, gap: 3, height:300}]}>
              <Image source={require('./images/0Top.png')} style={styles.image} />
              <Image source={require('./images/0Bottom.png')} style={styles.image} />
            </View>
            <View style={[styles.numberBox2 && {width:150, gap: 3, height:300}]}>
            <Image source={numberImagesTop[numberImageIndexTop]} style={styles.image} />
            <Image source={numberImagesBottom[numberImageIndexBottom]} style={styles.image} />
            </View>
          </View>
          <Text style={styles.text}>SEC</Text>
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
  button:{
    color: 'white',
    fontSize: 20,
    padding: 3,
    textAlign: 'center',
    width: 100,
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,

  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
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
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    objectFit: 'contain',
  },
  box1: {
    width: 200,
    height: 150,
    backgroundColor: 'black', 
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    objectFit: 'contain',
  },
  box2: {
    width: 150,
    height: 150,
    backgroundColor: 'black', 
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    objectFit: 'contain',
  },
  numberBox: {
    width: 100,
    backgroundColor: 'black',
    overflow: 'hidden',
    flexDirection: 'column',
    gap: 1,
    objectFit: 'contain',
  },
  numberBox2: {
    width: 75,
    backgroundColor: 'black',
    overflow: 'hidden',
    flexDirection: 'column',
    gap: 1,
    objectFit: 'contain',
  },
  column: {
    flexDirection: 'column',
  },
  text:{
    color: 'white',
    fontSize: 15,
    padding: 3,
    textAlign: 'center',
    width: 100,
    alignSelf: 'center',
  },
  
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
