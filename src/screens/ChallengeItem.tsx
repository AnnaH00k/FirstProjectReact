import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Check } from 'phosphor-react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { ChallengeObject } from './ChallengeObject'; // Import the ChallengeObject type



//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChallengeItemProps = NativeStackScreenProps<RootStackParamList, 'ChallengeItem'>;

const ChallengeItem = ({ route }: ChallengeItemProps) => {
  const { challengeObject, checkedTasks } = route.params;
  const [taskStates, setTaskStates] = useState(challengeObject.tasks.map(() => false));

  useEffect(() => {
    // Initialize taskStates based on checkedTasks
    const initialStates = challengeObject.tasks.map((task, index) =>
      checkedTasks.some((checkedTask) => checkedTask.description === task.description)
    );
    setTaskStates(initialStates);
  }, [checkedTasks, challengeObject.tasks]);


  const toggleTaskState = (index: number) => {
    setTaskStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];


      // Update the ChallengeObject with the new task states
      const updatedTasks = challengeObject.tasks.map((task, i) => ({
        ...task,
        state: newStates[i],
      }));

      const updatedChallengeObject: ChallengeObject = {
        id: challengeObject.name + challengeObject.description,
        name: challengeObject.name,
        description: challengeObject.description,
        time: challengeObject.time,
        type: challengeObject.type,
        tasks: updatedTasks,
      };


      // Save the updated ChallengeObject locally (you need to implement AsyncStorage logic here)
      saveChallengeObject(updatedChallengeObject);

      return newStates;
    });
  };

  const saveChallengeObject = async (updatedChallengeObject: ChallengeObject) => {
    try {
      // Get the existing challenges from AsyncStorage
      const savedChallenges = await AsyncStorage.getItem('challenges');
      const parsedChallenges = savedChallenges ? JSON.parse(savedChallenges) : [];

      // Find and update the specific challenge in the array
      const updatedChallenges = parsedChallenges.map((ch) =>
        ch.id === updatedChallengeObject.id ? updatedChallengeObject : ch
      );

      // Save the updated challenges array back to AsyncStorage
      await AsyncStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    } catch (error) {
      console.error('Error saving locally updated challenge:', error);
    }
  };
  

  const selectedChallengeType = challengeObject.type;
  const goToChallengeSetting = () => {
    navigation.navigate('ChallengeSetting', { challengeObject,checkedTasks: challengeObject.tasks.filter(task => task.completed) });
  };

    const goToChallenges = () => {
        navigation.navigate('Challenges', { challengeObject,checkedTasks: challengeObject.tasks.filter(task => task.completed) });
    };


  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={35} color="#797878" />
        </TouchableOpacity>
        <Text style={styles.textHeadline}>{challengeObject.name}</Text>
        <TouchableOpacity onPress={goToChallengeSetting}>
          <MaterialIcons name="settings" size={35} color="#797878" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.infoBox}>
            <Text style={styles.textDescription}>{challengeObject.description}</Text>
        </View>
        <View style={styles.infoBox}>
            <Text style={styles.timeHeadline}>Time:</Text>
            <Text style={styles.textDescription}>{challengeObject.time}</Text>
        </View>


        <View style={styles.buttonContainer}>
  {selectedChallengeType === 'current' && (
    <TouchableOpacity
      style={[styles.challengeTypeButton, styles.selectedButton]}
    >
      <Text style={[styles.buttonText2, styles.buttonText]}>Current</Text>
    </TouchableOpacity>
  )}
  {selectedChallengeType === 'saved' && (
    <TouchableOpacity
      style={[styles.challengeTypeButton, styles.selectedButton]}
    >
      <Text style={[styles.buttonText2, styles.buttonText]}>Saved</Text>
    </TouchableOpacity>
  )}
  {selectedChallengeType === 'completed' && (
    <TouchableOpacity
      style={[styles.challengeTypeButton, styles.selectedButton]}
    >
      <Text style={[styles.buttonText2, styles.buttonText]}>Completed</Text>
    </TouchableOpacity>
  )}
</View>


        <View style={styles.sideScroll}>
          {challengeObject.tasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.taskBox,
                { backgroundColor: taskStates[index] ? '#48C9B0' : '#0D2B3E' },
              ]}
            >
              <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
                {taskStates[index] && (
                  <Check size={25} color="white" weight="fill" />
                )}
                <Text style={styles.challengeBoxText}>{task.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={goToChallenges}>
        <Text style={styles.saveButtonText}>Go to Challenge overview</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChallengeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091825',
  },
  infoBox: {
    flexDirection: 'row',
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'white',
    padding: 16,
  },
  textHeadline: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  textDescription: {
    color: '#D0D6D6',
    fontSize: 25,
    fontStyle: 'italic',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  timeHeadline: {
    color: '#D0D6D6',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 20,
    width: '100%',
  },
  sideScroll: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
    width: '80%', // Adjust the width based on your preference

  },
  taskBox: {
    backgroundColor: '#0D2B3E',
    padding: 10,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    width: 'auto', // Adjust the width based on your preference
  },
  challengeBoxText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  challengeTypeButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0D6D6',
    flex: 1,
    alignItems: 'center',
},
selectedButton: {
    backgroundColor: '#0D2B3E',
    color: 'black',
},
 
selectedText: {
    color: 'white',
    fontSize: 25,
    marginHorizontal: 10,
    textAlign: 'center',
},

buttonText: {
    color: 'white',
    fontSize: 25,
},
buttonText2: {
    color: 'grey',
    fontSize: 25,
},
buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
},
saveButton: {
    backgroundColor: '#091825',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    padding: 12,
    marginTop: 16,
    alignSelf: 'center',
    width: '30%',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
