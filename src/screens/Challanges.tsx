import { Button, StyleSheet,Text, View} from 'react-native'
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
            <Text>Challanges</Text>
           
        </View>
    )
}

export default Challanges

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallText: {
        color:"#000000"
    }
})