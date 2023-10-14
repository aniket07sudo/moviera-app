import React, { useEffect } from 'react'
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoPlayer, { VideoProperties } from 'react-native-video'


const ProfileScreen = ({navigation}) => {

    

    // getSize();
    

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'red'}}>
            <Text>Profile Page</Text>
            <Button title='Edit Profile' onPress={() => navigation.navigate('ProfileStack', { screen:'EditProfile' })} />
                <Image resizeMode='contain' style={{width:400,backgroundColor:'green',flexBasis:100}} source={{uri:'http://192.168.0.104:3000/witcher/thumb/output_7.jpg'}} />
                {/* <ImageBackground imageStyle={{backgroundColor:'yellow',height:1000}} style={{height:1000,width:400,backgroundColor:'blue',flexDirection:'row'}} resizeMode='contain' source={{uri:'http://192.168.0.104:3000/witch/thumb/output_7.jpg'}} /> */}
        </SafeAreaView>
    )
}

export default ProfileScreen;