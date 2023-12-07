// FlipClockHeader.tsx
import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FlipClockHeaderProps {
  navigation: any;
}

const FlipClockHeader: React.FC<FlipClockHeaderProps> = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSettings = () => {
    // Handle settings action
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black'}}>
    <StatusBar barStyle="light-content" />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 0 }}>
      <TouchableOpacity onPress={handleGoBack}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSettings}>
        <MaterialIcons name="settings" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default FlipClockHeader;
