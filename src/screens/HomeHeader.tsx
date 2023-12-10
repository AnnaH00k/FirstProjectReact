// FlipClockHeader.tsx
import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HomeHeaderProps {
  navigation: any;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ navigation }) => {
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
     
    </View>
    </SafeAreaView>
  );
};

export default HomeHeader;
