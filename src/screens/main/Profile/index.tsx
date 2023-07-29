import React from 'react'
import { Button, Text, View } from 'react-native'
import Player from '../../../components/Player';

const ProfileScreen = ({navigation}) => {

    return (
        <View>
            <Text>Profile Page</Text>
            <Player />
            <Button title='Edit Profile' onPress={() => navigation.navigate('ProfileStack', { screen:'EditProfile' })} />
        </View>
    )
}

export default ProfileScreen;