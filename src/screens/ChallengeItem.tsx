import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Check } from 'phosphor-react-native';
import React from 'react';

//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ChallengeItemProps = NativeStackScreenProps<RootStackParamList, 'ChallengeItem'>;

const ChallengeItem = ({ route }: ChallengeItemProps) => {
  const { challengeObject } = route.params;
  

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={35} color="#797878" />
        </TouchableOpacity>
        <Text style={styles.textHeadline}>Challenge Item</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="settings" size={35} color="#797878" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.textHeadline}>{challengeObject.name}</Text>
        <Text style={styles.textHeadline}>{challengeObject.description}</Text>
        <Text style={styles.textHeadline}>{challengeObject.time}</Text>
        <Text style={styles.textHeadline}>{challengeObject.type}</Text>
        <View style={styles.sideScroll}>
          {challengeObject.tasks.map((task, index) => (
            <View key={index} style={styles.taskBox}>
              <Text style={styles.challengeBoxText}>{task.description}</Text>
              <Check size={30} color="white" weight="fill" />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChallengeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091825',
  },
  textHeadline: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
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
    marginTop: 20,
    flexWrap: 'wrap',
  },
  taskBox: {
    backgroundColor: '#0D2B3E',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%', // Adjust the width based on your preference
  },
  challengeBoxText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
