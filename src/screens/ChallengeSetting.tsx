import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ChallengeObject } from './ChallengeObject'; // Import the ChallengeObject type
import AsyncStorage from '@react-native-async-storage/async-storage';


//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { CheckBox } from 'react-native-elements';

type ChallengeSettingProps = NativeStackScreenProps<
  RootStackParamList,
  'ChallengeSetting'
>;


const ChallengeSetting = ({route}: ChallengeSettingProps) => {
    const [challengeName, setChallengeName] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');
    const [challengeTime, setChallengeTime] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const [selectedChallengeType, setSelectedChallengeType] = useState('current'); // Default to 'current'
    const [checkedTasks, setCheckedTasks] = useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    useEffect(() => {
        // Check if route.params contains challengeObject and set the state accordingly
        if (route.params?.challengeObject) {
          const { name, description, time, tasks, type } = route.params.challengeObject;
          setChallengeName(name);
          setChallengeDescription(description);
          setChallengeTime(time);
          setTaskList(tasks);
          setSelectedChallengeType(type);

           // Extract checked tasks
            const completedTasks = tasks.filter(task => task.completed);
            setCheckedTasks(completedTasks);
        }
      }, [route.params?.challengeObject]);

    const addTask = () => {
        if (currentTask.trim() !== '') {
          // Add task to the taskList array
          setTaskList([...taskList, { description: currentTask, completed: false }]);
          setCurrentTask('');
        }
      };

      const deleteTask = (index: number) => {
        // Remove the task at the specified index
        const updatedTaskList = [...taskList];
        updatedTaskList.splice(index, 1);
        setTaskList(updatedTaskList);
      };
    
    
      const saveChallenge = async () => {
        // Create a Challenge object
        const challengeObject: ChallengeObject = {
          id: challengeName + challengeDescription,
          name: challengeName,
          description: challengeDescription,
          time: challengeTime,
          tasks: taskList,
          type: selectedChallengeType,
        };

  
        try {
            const existingChallenges = await AsyncStorage.getItem('challenges');
            let parsedChallenges = existingChallenges ? JSON.parse(existingChallenges) : [];
        
            // Check if a challenge with the same ID already exists
            const existingChallengeIndex = parsedChallenges.findIndex(
              (challenge) => challenge.id === challengeObject.id
            );
        
            if (existingChallengeIndex !== -1) {
              // If the challenge exists, update its details
              parsedChallenges[existingChallengeIndex] = challengeObject;
            } else {
              // If the challenge does not exist, add it to the array
              parsedChallenges.push(challengeObject);
            }
        
            // Save the updated challenges array to AsyncStorage
            await AsyncStorage.setItem('challenges', JSON.stringify(parsedChallenges));
        
            console.log('Challenge saved locally');
            navigation.navigate('ChallengeItem', { challengeObject, checkedTasks });
          } catch (error) {
            console.error('Error saving challenge:', error);
          }
        };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="#797878" />
                </TouchableOpacity>
                <Text style={styles.textHeadline}>Challenge Setting</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="delete-outline" size={35} color="#797878" />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Challenge Name"
          value={challengeName}
          onChangeText={(text) => setChallengeName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={challengeDescription}
          onChangeText={(text) => setChallengeDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Time (optional)"
          value={challengeTime}
          onChangeText={(text) => setChallengeTime(text)}
        />
        <TextInput
        style={styles.input}
        placeholder="Enter Task Description"
        value={currentTask}
        onChangeText={(text) => setCurrentTask(text)} // Ensure currentTask is updated
      />
      <TouchableOpacity onPress={addTask}>
            <MaterialIcons name="add-circle-outline" size={50} color="#797878" />
        </TouchableOpacity>
      </View>

      <View style={styles.taskListContainer}>
      <ScrollView>

        {taskList.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            
            <CheckBox
                checked={task.completed}
                onPress={() => {
                    // Update the completed status of the task
                    const updatedTaskList = [...taskList];
                    updatedTaskList[index].completed = !task.completed;
                    setTaskList(updatedTaskList);
                }}
            />
            <Text style={styles.taskDescription}>{task.description}</Text>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <MaterialIcons name="delete" size={30} color="#091825" />
            </TouchableOpacity>
          </View>
        ))}
        </ScrollView>

      </View>
      <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.challengeTypeButton, selectedChallengeType === 'current' && styles.selectedButton]}
                    onPress={() => setSelectedChallengeType('current')}
                >
                    <Text style={styles.buttonText}>Current</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.challengeTypeButton, selectedChallengeType === 'saved' && styles.selectedButton]}
                    onPress={() => setSelectedChallengeType('saved')}
                >
                    <Text style={styles.buttonText}>Saved</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.challengeTypeButton, selectedChallengeType === 'completed' && styles.selectedButton]}
                    onPress={() => setSelectedChallengeType('completed')}
                >
                    <Text style={styles.buttonText}>Completed</Text>
                </TouchableOpacity>
            </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveChallenge}>
        <Text style={styles.saveButtonText}>Save Challenge</Text>
      </TouchableOpacity>
    </View>
    );
};

export default ChallengeSetting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#091825',
      },
    textHeadline: {
        color:"white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    marginTop: 20,
    width: '100%',
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 80,
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '80%',
  },
  taskListContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    margin: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#091825',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
   taskDescription: {
    marginLeft: 8,
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
},
challengeTypeButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    flex: 1,
    alignItems: 'center',
},
selectedButton: {
    backgroundColor: '#5D744B',
    color: 'black',
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
},
})