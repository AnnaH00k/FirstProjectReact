import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const [timerActive, setTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(3000); // Initial countdown value in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  const startTimer = () => {
    setTimerActive(true);

    // Update the countdown every second
    const timerInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the interval when the countdown reaches 0
    setTimeout(() => {
      clearInterval(timerInterval);
      setTimerActive(false);
    }, countdown * 1000);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setCountdown(3000); // Reset countdown value
  };

  return (
    <View style={styles.container}>
      {timerActive ? (
        <Text style={styles.timerText}>{formatTime(countdown)}</Text>
        ) : (
        <Image
          source={require('./images/logo.png')}
          style={styles.image}
        />
      )}
      {timerActive ? (
        <Button title="Reset Timer" onPress={resetTimer} color="#000000" />
      ) : (
        <Button title="Start Timer" onPress={startTimer} color="#000000"/>
      )}
      <Button
        title="Go to Settings"
        color="#000000"
        onPress={() => navigation.push('Details', { productId: '86' })}
      />
    </View>
  );
};

// Helper function to format time as "hh:mm:ss"
const formatTime = (seconds: number) => {
    //const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  timerText: {
    width: 200,
    height: 200,
    marginBottom: 20,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 48,
    fontWeight: 'bold',
  },
});
