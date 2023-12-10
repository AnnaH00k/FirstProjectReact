import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type ChallengesProps = NativeStackScreenProps<RootStackParamList, 'Challenges'>


const Challenges = ({route}: ChallengesProps) => {


    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    // Placeholder data
  const currentChallenges = [
    { id: '1', name: 'Challenge 1', description: 'Description', time: 'Time', tasks: [], type: 'current' },
    { id: '2', name: 'Challenge 2', description: 'Description', time: 'Time', tasks: [], type: 'current' },
    // Add more challenges as needed
  ];

  const savedChallenges = [
    { id: '3', name: 'Challenge 3', description: 'Description', time: 'Time', tasks: [], type: 'saved' },
    { id: '4', name: 'Challenge 4', description: 'Description', time: 'Time', tasks: [], type: 'saved' },
    // Add more challenges as needed
  ];

  const completedChallenges = [
    { id: '5', name: 'Challenge 5', description: 'Description', time: 'Time', tasks: [], type: 'completed' },
    { id: '6', name: 'Challenge 6', description: 'Description', time: 'Time', tasks: [], type: 'completed' },
    // Add more challenges as needed
  ];

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

  const renderChallengesSection = (challenges: any[], sectionTitle: string) => {
    return (
      <View>
        <Text style={styles.underText}>{sectionTitle}</Text>
        {challenges.length > 0 ? (
          <View style={styles.sideScroll}>{renderChallenges(challenges)}</View>
        ) : (
          <Text style={styles.noChallengesText}>Add challenges</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={35} color="#797878" />
        </TouchableOpacity>
        <Text style={styles.textHeadline}>Challenges</Text>
        <TouchableOpacity onPress={() => navigation.push('ChallengeSetting')}>
          <MaterialIcons name="add-circle-outline" size={35} color="#797878" />
        </TouchableOpacity>
      </View>

      <View>
        {renderChallengesSection(currentChallenges, 'Current Challenges')}
        {renderChallengesSection(savedChallenges, 'Saved Challenges')}
        {renderChallengesSection(completedChallenges, 'Completed Challenges')}
      </View>
    </View>
  );
};
    
    export default Challenges;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#091825',
      },
      textHeadline: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
        width: '90%',
        marginLeft: 20,
        height: 100,
        marginBottom: 20,
        gap: 10,
      },
      challengeBox: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#364034',
        justifyContent: 'center',
        alignItems: 'center',
      },
      challengeBoxText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        padding: 20,
      },
      underText: {
        color: 'grey',
        fontSize: 15,
        textAlign: 'left',
        alignSelf: 'center',
        width: '90%',
        marginBottom: 10,
      },
      noChallengesText: {
        color: 'grey',
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
      },
    });