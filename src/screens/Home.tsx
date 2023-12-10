import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  Button,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0); // Index for the current image
  const [changingImages, setChangingImages] = useState(false); // State to control image changing
  const [modalVisible, setModalVisible] = useState(false); // State for the modal
  const [studyInterval, setStudyInterval] = useState(''); // State for study interval input
  const [pauseInterval, setPauseInterval] = useState(''); // State for pause interval input
  const [timerRunning, setTimerRunning] = useState(false); // State to control the timer
  const [currentInterval, setCurrentInterval] = useState(''); // Current interval (study or pause)
  const [timeRemaining, setTimeRemaining] = useState(0); // Time remaining in seconds

  useEffect(() => {
    // Load saved profile image when the component mounts
    loadProfileImage();
  }, []);

// Ensure that permissions are granted before using the image picker
const getPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access media library is required!');
  }
};

   // Placeholder data
   const currentChallenges = [
    { id: '1', name: 'Challenge 1', description: 'Description', time: 'Time', tasks: [], type: 'current' },
    { id: '2', name: 'Challenge 2', description: 'Description', time: 'Time', tasks: [], type: 'current' },
    // Add more challenges as needed
  ];

  const loadProfileImage = async () => {
    try {
      const savedImageUri = await AsyncStorage.getItem('profileImage');
      if (savedImageUri) {
        setProfileImage({ uri: savedImageUri });
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  const pickImage = () => {
    ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images }).then((response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setProfileImage(selectedImage);
        saveProfileImage(selectedImage.uri);
      }
    });
  };

  const saveProfileImage = async (imageUri) => {
    try {
      await AsyncStorage.setItem('profileImage', imageUri);
    } catch (error) {
      console.error('Error saving profile image:', error);
    }
  };

  const removeProfileImage = async () => {
    try {
      await AsyncStorage.removeItem('profileImage');
      setProfileImage(null);
    } catch (error) {
      console.error('Error removing profile image:', error);
    }
  };
  const renderChallenges = (challenges: {
    description: string;
    time: string;
    tasks: any[]; id: string; name: string ; type: string;
      }[]) => {
  return challenges.map((challenge) => (
    <TouchableOpacity
      key={challenge.id}
      style={styles.challengeBox}
      onPress={() => navigation.push('ChallengeItem', {
          challengeObject: {
            name: challenge.name,
            description: challenge.description, // Add description
            time: challenge.time, // Add time
            tasks: challenge.tasks, // Add tasks
            type: challenge.type, // Add challenge type
          },
        })}
    >
      <Text style={styles.challengeBoxText}>{challenge.name}</Text>
    </TouchableOpacity>
  ));
};


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
            <TouchableOpacity onPress={() => navigation.push('Challenges')}>
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
               {/* Profile Image */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {profileImage ? (
          <Image source={profileImage} style={styles.profileImage} />
        ) : (
          <Text style={styles.profileImageText}>Add Profile Picture</Text>
        )}
      </TouchableOpacity>
      
            <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>Anna Hook</Text>
            
            <Text style={styles.underText}>Current Challenges:</Text>
            <View style={styles.sideScroll}>{renderChallenges(currentChallenges)}</View>

            <Text style={styles.underText}>Completed Challenges:</Text>


        </Animated.View>
      )}


      {/* Modal for image actions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Pick Image" onPress={pickImage} />
            {profileImage && (
              <Button title="Remove Image" onPress={removeProfileImage} />
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
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
  profileImageText: {
    color: 'white',
    fontSize: 16,
    padding: 20,
    width: 100,
    height: 100,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 1,
    textAlign: 'center',
    display: 'flex',  // Use flex display
    alignItems: 'center',
    justifyContent: 'center',
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
