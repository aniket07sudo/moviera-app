import React from 'react'
import { Button, Text, View } from 'react-native'

const ProfileScreen = ({navigation}) => {

    return (
        <View>
            <Text>Profile Page</Text>
            <Button title='Edit Profile' onPress={() => navigation.navigate('ProfileStack', { screen:'EditProfile' })} />
        </View>
    )
}

export default ProfileScreen;