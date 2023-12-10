import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ChallengesHeaderProps {
  navigation: any;
}

const ChallengesHeader: React.FC<ChallengesHeaderProps> = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSettings = () => {
    // Handle settings action
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#091825'}}>
    <StatusBar barStyle="light-content" />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 0 }}>
      <TouchableOpacity onPress={handleGoBack}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
    </View>
    </SafeAreaView>
  );
};

export default ChallengesHeader;
