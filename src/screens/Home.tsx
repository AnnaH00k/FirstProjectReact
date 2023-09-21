import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, PanResponder, Animated, Easing, TouchableOpacity, Modal, Text, TextInput } from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0); // Index for the current image
  const [changingImages, setChangingImages] = useState(false); // State to control image changing
  const [modalVisible, setModalVisible] = useState(false); // State for the modal
  const [studyInterval, setStudyInterval] = useState(''); // State for study interval input
  const [pauseInterval, setPauseInterval] = useState(''); // State for pause interval input
  const [timerRunning, setTimerRunning] = useState(false); // State to control the timer
  const [currentInterval, setCurrentInterval] = useState(''); // Current interval (study or pause)
  const [timeRemaining, setTimeRemaining] = useState(0); // Time remaining in seconds

  const images = [
    require('./images/logo1.png'),
    require('./images/logo2.png'),
    require('./images/logo3.png'),
    require('./images/logo4.png'),
    require('./images/logo5.png'),
    require('./images/logo6.png'),
    require('./images/logo7.png'),
    require('./images/logo8.png'),
    require('./images/logo9.png'), // Add more images as needed
  ];

  const menuTranslateX = new Animated.Value(300);
  const menuTranslateY = new Animated.Value(-300);

  // Function to change the image every half second
  useEffect(() => {
    if (changingImages) {
      const interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [changingImages, images]);

  // Function to handle image click
  const handleImageClick = () => {
    // Toggle image changing
    setChangingImages((prevChangingImages) => !prevChangingImages);

    // Start or pause the timer
    if (!timerRunning) {
      // Check if we are in the study interval or pause interval and set the time accordingly
      const intervalInSeconds = currentInterval === 'Study' ? parseInterval(studyInterval) : parseInterval(pauseInterval);

      setTimeRemaining(intervalInSeconds);
      setTimerRunning(true);

      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            // Timer finished, switch to the other interval
            setTimerRunning(false);
            setCurrentInterval((prevInterval) => (prevInterval === 'Study' ? 'Pause' : 'Study'));
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Cleanup the timer when unmounting or pausing
      return () => clearInterval(timer);
    } else {
      // Pause the timer
      setTimerRunning(false);
    }
  };

  // Function to handle the Save button in the modal
  const handleSave = () => {
    // Validate and save study and pause intervals locally
    if (isValidInterval(studyInterval) && isValidInterval(pauseInterval)) {
      // You can save these values to local storage or state as needed
      // For example, you can use AsyncStorage for local storage in React Native
      // AsyncStorage.setItem('studyInterval', studyInterval);
      // AsyncStorage.setItem('pauseInterval', pauseInterval);

      // Close the modal
      setModalVisible(false);
    } else {
      // Display an error message or handle invalid input
    }
  };

  // Function to validate the interval format (e.g., "mm:ss")
  const isValidInterval = (interval: string) => {
    // You can implement your validation logic here
    // For example, you can use regular expressions to validate the format
    // For simplicity, we'll check if it contains ":" here
    return interval.includes(':');
  };

  // Function to parse the interval into seconds
  const parseInterval = (interval: string) => {
    const [minutes, seconds] = interval.split(':').map((str) => parseInt(str, 10));
    return minutes * 60 + seconds;
  };

    // PanResponder for swipe gesture
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dx < -50) {
        // Swipe left detected, open the menu
        setMenuOpen(true);
        Animated.timing(menuTranslateX, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > 50) {
        // Swipe right detected, close the menu
        setMenuOpen(true);
        Animated.timing(menuTranslateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => {
          setMenuOpen(false);
        });
      }
    },
    onPanResponderRelease: () => {},
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImageClick}>
          <Image
            source={images[imageIndex]}
            style={styles.image}
          />
        </TouchableOpacity>
        <Button title="Set Intervals" onPress={() => setModalVisible(true)} />
        {timerRunning && (
          <View style={styles.timerContainer}>
            <Text>{currentInterval} Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</Text>
          </View>
        )}
      </View>

      {/* Menu */}
      {menuOpen && (
        <Animated.View
          style={[
            styles.menu,
            { transform: [{ translateX: menuTranslateX }] },
          ]}
        >
          <Button title="Challenges" color='white' onPress={() => navigation.push('Challanges')} />
          <Button title="Task List" color='white' onPress={() => navigation.push('TaskList')} />
          <Button title="Promodoro" color='white' onPress={() => navigation.push('Promodoro')} />
          <Button title="Green Screen Clock" color='white' onPress={() => navigation.push('GreenScreen')} />
          <Button title="Statistics" color='white' onPress={() => navigation.push('Statistics')} />
        </Animated.View>
      )}

      {/* Modal for setting intervals */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Study Interval (mm:ss):</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setStudyInterval(text)}
              value={studyInterval}
            />
            <Text>Enter Pause Interval (mm:ss):</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setPauseInterval(text)}
              value={pauseInterval}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#3E322A',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  timerContainer: {
    marginTop: 10,
  },
});
