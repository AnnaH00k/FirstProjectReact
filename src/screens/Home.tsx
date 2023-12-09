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

            <TouchableOpacity onPress={() => navigation.push('FlipClock')}>
              <Text style={[styles.button, { borderWidth: 1 }]}>Flip clock</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('Challanges')}>
              <Text style={[styles.button, { borderWidth: 1 }]}>Challenges</Text> 
            </TouchableOpacity>
          {/*  <TouchableOpacity onPress={() => navigation.push('Statistics')}>
              <Text style={[styles.button, { borderWidth: 1 }]}>Statistics</Text> 
              </TouchableOpacity> */}

        
      
      
      
      {/* Slider */}
      {menuOpen && (
        <Animated.View
          style={[
            styles.menu,
            { transform: [{ translateX: menuTranslateX }] },
          ]}
        >
            <TouchableOpacity style={styles.profileImage} onPress={() => navigation.push('FlipClock')}>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>Anna Hook</Text>
            <Text style={styles.underText}>Current Challenges:</Text>
            <View style={styles.sideScroll}>
            <TouchableOpacity style={styles.challengeBox} onPress={() => navigation.push('FlipClock')}>
            <Text style={styles.challengeBoxText}>Challenge Name</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.challengeBox} onPress={() => navigation.push('FlipClock')}>
            <Text style={styles.challengeBoxText}>Challenge Name</Text>
            </TouchableOpacity>
            </View>

            <Text style={styles.underText}>Completed Challenges:</Text>


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
         
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    padding: 4,
    width: 150,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: 'white',
    borderRadius: 10,
    color: 'white',
    fontSize: 17,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  sideScroll: {
    flexDirection: 'row',
    width: '80%',
    height: 100,
    marginBottom: 20,
    gap: 10,
  },
  challengeBox: {
    width: 110,
    height: 80,
    borderRadius: 1000,
    backgroundColor: '#364034',
    },
  challengeBoxText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
    height: 80,
    width: 110,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
  },
  underText: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'left',  
    width: '80%',
    marginBottom: 10,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#091825',
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
    width: '95%',
    height: '90%',
    backgroundColor: '#091825',
    borderColor: 'white',
    borderWidth: 0.3,
    borderRadius: 1000,
    shadowColor: 'white',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 7,
    marginTop: 10,
    marginBottom: 10,
    shadowOpacity: 0.9,
    elevation: 5,
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
