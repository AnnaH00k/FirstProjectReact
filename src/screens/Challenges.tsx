import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ChallengeObject } from './ChallengeObject'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type ChallengesProps = NativeStackScreenProps<RootStackParamList, 'Challenges'>


const Challenges = ({route}: ChallengesProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    // State to hold the locally saved challenges
    const [localChallenges, setLocalChallenges] = useState<ChallengeObject[]>([]);

    useEffect(() => {
        const fetchLocalChallenges = async () => {
          try {
            const savedChallenges = await AsyncStorage.getItem('challenges');
            const parsedChallenges = savedChallenges ? JSON.parse(savedChallenges) : [];
            setLocalChallenges(parsedChallenges);
          } catch (error) {
            console.error('Error fetching locally saved challenges:', error);
          }
        };
    
        fetchLocalChallenges();
      }, []); // Empty dependency array to run the effect only once


      

      const renderChallenges = (challenges: ChallengeObject[]) => {
        return challenges.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={styles.challengeBox}
            onPress={() => navigation.push('ChallengeItem', { challengeObject: challenge, checkedTasks: challenge.tasks.filter(task => task.completed) })}
          >
            <Text style={styles.challengeBoxText}>{challenge.name}</Text>
            <Text style={styles.challengeBoxDescription}>{challenge.description}</Text>
            {challenge.tasks && challenge.tasks.length > 0 && (
              <Text style={styles.challengeBoxTasks}>
                Tasks: {challenge.tasks.length}
              </Text>
            )}
             {challenge.time && (
              <Text style={styles.challengeBoxTime}>{challenge.time}</Text>
            )}
          </TouchableOpacity>
        ));
      };


      const deleteAllChallenges = async () => {
        try {
          // Remove challenges from AsyncStorage
          await AsyncStorage.removeItem('challenges');
          
          // Clear the localChallenges state
          setLocalChallenges([]);
        } catch (error) {
          console.error('Error deleting challenges:', error);
        }
      };

      

  const renderChallengesSection = (challenges: ChallengeObject[], sectionTitle: string) => {
    const sortedChallenges = challenges.filter((challenge) => challenge.type === sectionTitle.toLowerCase());

    return (
      <View>
        <Text style={styles.underText}>{sectionTitle}</Text>
        {sortedChallenges.length > 0 ? (
          <View style={styles.sideScroll}>{renderChallenges(sortedChallenges)}</View>
        ) : (
          <Text style={styles.noChallengesText}>Add  {sectionTitle.toLowerCase()} challenges in the top right corner.</Text>
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row'}}>
      {renderChallengesSection(localChallenges, 'Current')}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
      {renderChallengesSection(localChallenges, 'Saved')}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row'}}>
      {renderChallengesSection(localChallenges, 'Completed')}
      </ScrollView>

      <Button title="Delete All Challenges" onPress={deleteAllChallenges} color="#FF0000" />


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
        width: 'auto',
        alignSelf: 'center',
        marginLeft: 20,
        marginBottom: 20,
        gap: 10,
      },
      challengeBox: {
        borderRadius: 20,
        backgroundColor: '#0D2B3E',
        minWidth: 300,
        maxWidth: 400,
        width: 'auto', // Adjust the width to allow dynamic sizing
        height: 200,
        gap: 10,
        padding: 15,
      },
      challengeBoxText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
      },
      challengeBoxDescription: {
        fontSize: 20,
        textAlign: 'left',
        color: '#D0D6D6',
        fontStyle: 'italic',
      },
      challengeBoxTime: {
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        color: '#D0D6D6',
        borderWidth: 0.4,
        borderRadius: 20,
        borderColor: '#D0D6D6',
        padding: 5,
        width: 'auto',
      },
    
      challengeBoxTasks: {
        fontSize: 20,
        textAlign: 'left',
        justifyContent: 'center',
        paddingBottom: 10,
        color: '#48C9B0',
        width: 'auto',
      },
      underText: {
        color: 'grey',
        fontSize: 15,
        textAlign: 'left',
        marginLeft: 20,
        width: '100%',
        marginBottom: 10,
      },
      noChallengesText: {
        color: 'grey',
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        height: 200,
        marginLeft: 20,
      },
    });