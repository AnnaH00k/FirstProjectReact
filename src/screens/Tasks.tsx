import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trash } from 'phosphor-react-native';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    async function saveTasks() {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }

    saveTasks();
  }, [tasks]);

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.checked = !task.checked;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (taskInput.trim() === '') {
      return; // Don't add empty tasks
    }
    const newTask = {
      id: (tasks.length + 1).toString(),
      task: taskInput,
      checked: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput(''); // Clear the input field after adding a task
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleInputSubmit = () => {
    addTask();
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <CheckBox
        checked={item.checked}
        onPress={() => toggleTask(item.id)}
      />
      <Text style={styles.taskText}>{item.task}</Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Trash size={30} color="#A58D78" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Daily Schedule</Text>
      <TextInput
        style={styles.taskInput}
        placeholder="Input task..."
        value={taskInput}
        onChangeText={(text) => setTaskInput(text)}
        onSubmitEditing={handleInputSubmit}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonLabel}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align delete button to the right
    marginBottom: 10,
  },
  taskText: {
    flex: 1, // Allow task text to take available space
    marginLeft: 10,
    fontSize: 18,
  },
  taskInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#A58D78', // Add your preferred color here
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskList;
