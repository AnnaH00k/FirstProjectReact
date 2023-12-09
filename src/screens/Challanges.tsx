import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import React from 'react'

//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type ChallangesProps = NativeStackScreenProps<RootStackParamList, 'Challanges'>


const Challanges = ({route}: ChallangesProps) => {


    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#797878" />
                </TouchableOpacity>
                <Text style={styles.textHeadline}>Challanges</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="add-circle-outline" size={24} color="#797878" />
                </TouchableOpacity>
            </View>
       

        
           
        </View>
    )
}

export default Challanges

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
})