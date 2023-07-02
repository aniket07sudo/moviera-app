import React from "react";
import {View,Text, Button} from 'react-native'

const SearchScreen = ({navigation}) => {
    
    return (
        <View>
            <Text>Search Page</Text>
            <Button title="Movie Details" onPress={() => navigation.navigate('HomeStack',{ screen:'HomeDetailsScreen' })} />
        </View>
    )
}
export default SearchScreen;