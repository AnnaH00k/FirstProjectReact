import {Button, StyleSheet, Text,View,Image} from 'react-native'
import React from 'react'

//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({navigation}: HomeProps) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('./images/logo.png')}  
                style={styles.image}
            />
            <Text style= {styles.smallText}>Home Screen</Text>
            <Button
                title='Go to Settings'
                // onPress={() => navigation.navigate("Details", {
                //     productId: "86"
                // })}
               
               // onPress={() => navigation.navigate("Details")}

               onPress={() => navigation.push("Details", {
                productId: "86"
               })}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 200,  
        height: 200,
        marginBottom: 20,  
      },
    smallText: {
        color:"#000000"
    }
})