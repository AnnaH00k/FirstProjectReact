import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { CheckBox } from 'react-native-elements';

type ChallengeSettingProps = NativeStackScreenProps<RootStackParamList, 'ChallengeSetting'>


const ChallengeSetting = ({route}: ChallengeSettingProps) => {
    const [challengeName, setChallengeName] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');
    const [challengeTime, setChallengeTime] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const [selectedChallengeType, setSelectedChallengeType] = useState('current'); // Default to 'current'
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const addTask = () => {
        if (currentTask.trim() !== '') {
          // Add task to the taskList array
          setTaskList([...taskList, { description: currentTask, completed: false }]);
          setCurrentTask('');
        }
      };
    
      const saveChallenge = () => {
        // Create a Challenge object and save it locally
        const challengeObject = {
          name: challengeName,
          description: challengeDescription,
          time: challengeTime,
          tasks: taskList,
          type: selectedChallengeType, // Add challenge type

        };
            console.log(challengeObject);
            // Navigate to ChallengeItem screen and pass the challengeObject as a route param
            navigation.navigate('ChallengeItem', { challengeObject });
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
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 16,
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