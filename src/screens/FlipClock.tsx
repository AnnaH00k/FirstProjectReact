import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from 'react-native-elements';
import FlipClockHeader from './FlipClockHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';


type FlipClockProps = NativeStackScreenProps<RootStackParamList, 'FlipClock'>;

const FlipClock = ({ route }: FlipClockProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const windowDimensions = useWindowDimensions();
  const isBigScreen = windowDimensions.width > 500; // Adjust the threshold as needed
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [manualInput, setManualInput] = useState('');
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); // New state for settings visibility




  const [isStarted, setIsStarted] = useState(false);
  const [numberImageIndexTop, setNumberImageIndexTop] = useState(0); // Index for the current image
  const [numberImageIndexBottom, setNumberImageIndexBottom] = useState(0); // Index for the current image
  const [isSeconds, setIsSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const numberImagesTop = [
    require('./images/FlipClockImages/0Top.png'),
    require('./images/FlipClockImages/1Top.png'),
    require('./images/FlipClockImages/2Top.png'),
    require('./images/FlipClockImages/3Top.png'),
    require('./images/FlipClockImages/4Top.png'),
    require('./images/FlipClockImages/5Top.png'),
    require('./images/FlipClockImages/6Top.png'),
    require('./images/FlipClockImages/7Top.png'),
    require('./images/FlipClockImages/8Top.png'),
    require('./images/FlipClockImages/9Top.png'),
  ];
  const numberImagesBottom = [
    require('./images/FlipClockImages/0Bottom.png'),
    require('./images/FlipClockImages/1Bottom.png'),
    require('./images/FlipClockImages/2Bottom.png'),
    require('./images/FlipClockImages/3Bottom.png'),
    require('./images/FlipClockImages/4Bottom.png'),
    require('./images/FlipClockImages/5Bottom.png'),
    require('./images/FlipClockImages/6Bottom.png'),
    require('./images/FlipClockImages/7Bottom.png'),
    require('./images/FlipClockImages/8Bottom.png'),
    require('./images/FlipClockImages/9Bottom.png'),
];


// Save seconds locally
const saveSecondsLocally = async (seconds) => {
  try {
    await AsyncStorage.setItem('savedSeconds', String(seconds));
  } catch (error) {
    console.error('Error saving seconds:', error);
  }
};

// Retrieve saved seconds
const getSavedSeconds = async () => {
  try {
    const savedSeconds = await AsyncStorage.getItem('savedSeconds');
    return savedSeconds ? parseInt(savedSeconds) : 0;
  } catch (error) {
    console.error('Error retrieving seconds:', error);
    return 0;
  }
};


   // Function to change the image every second
   useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setElapsedSeconds((prevSeconds) => prevSeconds + 1);
        setNumberImageIndexTop((prevIndex) => (prevIndex + 1) % numberImagesTop.length);
        setNumberImageIndexBottom((prevIndex) => (prevIndex + 1) % numberImagesBottom.length);
        saveSecondsLocally(elapsedSeconds);
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
    setElapsedSeconds(0);
  };
  const handleSettings = () => {
    // Toggle settings visibility
    setIsSettingsVisible((prevIsVisible) => !prevIsVisible);
  };


// Function to handle manual input submit
const handleManualInputSubmit = () => {
  const seconds = parseInt(manualInput, 10);
  if (!isNaN(seconds)) {
    setElapsedSeconds(seconds);
    saveSecondsLocally(seconds); // Save the input locally
  }
};

   // Fetch saved seconds when the component mounts
   useEffect(() => {
    const fetchSavedSeconds = async () => {
      const savedSeconds = await getSavedSeconds();
      setElapsedSeconds(savedSeconds);
    };

    fetchSavedSeconds();
  }, []); // Empty dependency array ensures that this effect runs only once, on mount


  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#797878" />
        </TouchableOpacity>
        <View style={styles.startStop}>
        <TouchableOpacity style={styles.navButtons} onPress={handleStartClick}>
          <Text style={styles.button}>{isStarted ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
          {isStarted &&
            <TouchableOpacity onPress={handleStop}>
              <Text style={[styles.button, { borderWidth: 1 }]}>Stop</Text> 
            </TouchableOpacity>
          }
      </View>

        <TouchableOpacity onPress={handleSettings}> 
          <MaterialIcons name="settings" size={24} color="#797878" />
        </TouchableOpacity>
      </View>



      <View style={[styles.content, isBigScreen && { flexDirection: 'row', gap: 40 }]}>
        {/* Box 1 */}
        <View style={styles.column}>
          <View style={[styles.box, isBigScreen && {width:375, height:250}]}>
          <View style={[styles.numberBox, isBigScreen && {width:125, gap: 3, height:250}]}>
            <Image source={numberImagesTop[Math.floor((elapsedSeconds / 360000) % 10)]} style={styles.image} />
            <Image source={numberImagesBottom[Math.floor((elapsedSeconds / 360000) % 10)]} style={styles.image} />
          </View>
          <View style={[styles.numberBox, isBigScreen && {width:125, gap: 3, height:250}]}>
            <Image source={numberImagesTop[Math.floor((elapsedSeconds % 360000) / 36000)]} style={styles.image} />
            <Image source={numberImagesBottom[Math.floor((elapsedSeconds % 360000) / 36000)]} style={styles.image} />
          </View>
          <View style={[styles.numberBox, isBigScreen && { width: 125, gap: 3, height: 250 }]}>
            <Image source={numberImagesTop[Math.floor((elapsedSeconds % 36000) / 3600) % 10]} style={styles.image} />
            <Image source={numberImagesBottom[Math.floor((elapsedSeconds % 36000) / 3600) % 10]} style={styles.image} />
          </View>
          </View>
          <Text style={[styles.text, isBigScreen && {fontSize:30}]}>HOUR</Text>

        </View>

        {/* Box 2 */}
        <View style={styles.column}>
        <View style={[styles.box1, isBigScreen && {width:250, height:250, marginRight:30, marginLeft:30}]}>
              <View style={[styles.numberBox, isBigScreen && { width: 125, gap: 3, height: 250 }]}>
                <Image source={numberImagesTop[Math.floor((elapsedSeconds % 3600) / 600) % 6]} style={styles.image} />
                <Image source={numberImagesBottom[Math.floor((elapsedSeconds % 3600) / 600) % 6]} style={styles.image} />
              </View>
              <View style={[styles.numberBox, isBigScreen && { width: 125, gap: 3, height: 250 }]}>
                <Image source={numberImagesTop[Math.floor((elapsedSeconds % 3600) / 60) % 10]} style={styles.image} />
                <Image source={numberImagesBottom[Math.floor((elapsedSeconds % 3600) / 60) % 10]} style={styles.image} />
              </View>
          </View>
          <Text style={[styles.text, isBigScreen && {fontSize:30}]}>MIN</Text>
        </View>

        {/* Box 3 */}
        <View style={styles.column}>
          <View style={[styles.box2, isBigScreen && { width: 250, height: 250 }]}>
          <View style={[styles.numberBox2, isBigScreen && { width: 125, gap: 3, height: 250 }]}>
                <Image source={numberImagesTop[Math.floor((elapsedSeconds % 3600) / 10) % 6]} style={styles.image} />
                <Image source={numberImagesBottom[Math.floor((elapsedSeconds % 3600) / 10) % 6]} style={styles.image} />
              </View>
            <View style={[styles.numberBox2, isBigScreen && { width: 125, gap: 3, height: 250 }]}>
              <Image source={numberImagesTop[elapsedSeconds % 10]} style={styles.image} />
              <Image source={numberImagesBottom[elapsedSeconds % 10]} style={styles.image} />
            </View>
          </View>
          <Text style={[styles.text, isBigScreen && {fontSize:30}]}>SEC</Text>
        </View>
      </View>

      {isSettingsVisible && ( // Render the settings input only if isSettingsVisible is true

      <View style={styles.manualInputContainer}>
        <TextInput
          style={styles.manualInput}
          placeholder="Set Seconds"
          placeholderTextColor={'#797878'}
          keyboardType="numeric"
          value={manualInput}
          onChangeText={(text) => setManualInput(text)}
        />
        <TouchableOpacity  onPress={handleManualInputSubmit}>
          <Text style={styles.button}>Set</Text>
        </TouchableOpacity>
      </View>
      )}
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
    color: '#797878',
    fontSize: 20,
    padding: 3,
    textAlign: 'center',
    width: 100,
    alignSelf: 'center',
    borderColor: '#797878',
    borderRadius: 10,
    borderWidth: 1,

  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  manualInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    fontSize: 30,
  },
  manualInput: {
    borderColor: '#797878',
    borderWidth: 1,
    borderRadius: 10,
    color: '#797878',
    padding: 8,
    marginRight: 10,
    fontSize: 25,

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
  startStop: {
    flexDirection: 'row',
    justifyContent: 'center',
   gap: 20,
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
