import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { HomeStackParamList } from "../../../../ts/types/navigation";

type HomeDetailsScreenProps = NativeStackScreenProps<HomeStackParamList,'HomeDetailsScreen'>

const HomeDetails = ({navigation,route}:HomeDetailsScreenProps) => {

    return (
        <View>
            <Text style={{color:'red'}}>Home Details</Text>
            <Text style={{color:'red'}}>Id : {route.params.id}</Text>
        </View>
    )
}

export default HomeDetails;